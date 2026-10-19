import { summarizeSession, aggregate } from "./usage.js";
export const name = "local-traffic-monitor";
export const inject = ["connection", "sessionPersistence"];
/** Read-only dashboard route. Cached summaries are discarded when the plugin unloads. */
export function apply(ctx) {
  const cache = new Map();
  let pending;
  let disposed = false;
  async function collect() {
    const snapshots = await ctx.sessionPersistence.list();
    const present = new Set(snapshots.map((snapshot) => snapshot.header.id));
    for (const id of cache.keys()) if (!present.has(id)) cache.delete(id);
    const rows = [],
      failures = [];
    for (const snapshot of snapshots) {
      if (disposed) throw new Error("Plugin unloaded");
      const { id } = snapshot.header;
      try {
        let entry = cache.get(id);
        if (!entry || entry.revision !== snapshot.revision) {
          const handle = await ctx.sessionPersistence.open(id, "read");
          try {
            const { events } = await handle.read();
            entry = {
              revision: snapshot.revision,
              rows: summarizeSession(
                handle.header,
                events,
                handle.inheritedEventCount,
              ),
            };
            cache.set(id, entry);
          } finally {
            await handle.close();
          }
        }
        rows.push(...entry.rows);
      } catch (error) {
        cache.delete(id);
        ctx.logger.warn("traffic-monitor: session read failed", id, error);
        failures.push({ sessionId: id, code: "session-read-failed" });
      }
    }
    return { rows, failures, scannedSessions: snapshots.length };
  }
  ctx.effect(() => async () => {
    disposed = true;
    try {
      await pending;
    } catch (error) {
      ctx.logger.warn(
        "traffic-monitor: collection stopped during unload",
        error,
      );
    } finally {
      cache.clear();
    }
  });
  ctx.effect(() =>
    ctx.connection.fetch.register({
      path: "/api/local-traffic-monitor",
      methods: ["GET"],
      requestBody: "buffered",
      async fetch(req) {
        const send = (status, body) =>
          Response.json(body, {
            status,
            headers: {
              "Cache-Control": "no-store",
              "X-Content-Type-Options": "nosniff",
            },
          });
        if (req.method !== "GET")
          return send(405, { error: "method-not-allowed" });
        const url = new URL(req.url);
        const days = Number(url.searchParams.get("days") ?? 30);
        const timeZone = url.searchParams.get("timeZone") ?? "Asia/Hong_Kong";
        try {
          if (![0, 7, 30, 90].includes(days)) throw new Error("Invalid range");
          new Intl.DateTimeFormat("en", { timeZone }).format();
        } catch {
          return send(400, { error: "invalid-query" });
        }
        try {
          if (!pending)
            pending = collect().finally(() => {
              pending = undefined;
            });
          const { rows, ...metadata } = await pending;
          return send(200, { ...aggregate(rows, days, timeZone), ...metadata });
        } catch (error) {
          ctx.logger.warn("traffic-monitor: collection failed", error);
          return send(503, { error: "collection-failed" });
        }
      },
    }),
  );
}
