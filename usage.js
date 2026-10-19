/** Derive request settlements without retaining prompts or generated content. */
export function summarizeSession(header, events, inheritedEventCount = 0) {
  const rows = [];
  let route = {};
  let last;
  for (const event of events) {
    if (event.type === "request/header") route = event.data.header.config;
    if (event.seq < inheritedEventCount) continue;
    if (event.type === "llm/retry-started") {
      last = undefined;
      continue;
    }
    if (
      event.type !== "assistant/message" &&
      event.type !== "assistant/attempt"
    )
      continue;
    const data = event.data;
    const stream = data.stream ?? [];
    const usage =
      data.usage ??
      stream.findLast(
        (record) => record.type === "chunk" && record.chunk.type === "usage",
      )?.chunk.usage;
    const source = data.message?.source ?? route;
    const same = last && last.turn === data.turn && last.step === data.step;
    const row = {
      sessionId: header.id,
      project: header.cwd ?? "",
      time: event.time,
      provider: source.provider ?? "",
      model: source.model ?? "",
      input: 0,
      output: 0,
      cacheRead: 0,
      cacheWrite: 0,
      total: 0,
      measured: false,
    };
    if (usage) {
      for (const field of [
        "inputTokens",
        "outputTokens",
        "cacheReadTokens",
        "cacheWriteTokens",
        "totalTokens",
      ]) {
        if (
          usage[field] !== undefined &&
          (!Number.isSafeInteger(usage[field]) || usage[field] < 0)
        )
          throw new Error("Invalid token accounting");
      }
      row.input = usage.inputTokens ?? 0;
      row.output = usage.outputTokens ?? 0;
      row.cacheRead = usage.cacheReadTokens ?? 0;
      row.cacheWrite = usage.cacheWriteTokens ?? 0;
      row.total =
        usage.totalTokens ??
        row.input + row.output + row.cacheRead + row.cacheWrite;
      row.measured = true;
    } else if (same && rows[last.index].measured) {
      // A settlement without usage must not erase an earlier accounting sample.
      continue;
    }
    if (same) rows[last.index] = row;
    else rows.push(row);
    last = { turn: data.turn, step: data.step, index: rows.length - 1 };
  }
  return rows;
}
/** Local calendar key; caller supplies a validated IANA time zone. */
export function dateKey(time, timeZone) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(time);
}
/** Aggregate numeric request records for a selected local calendar range. */
export function aggregate(
  rows,
  days = 30,
  timeZone = "Asia/Hong_Kong",
  now = Date.now(),
) {
  const today = dateKey(now, timeZone);
  const end = Date.parse(today + "T00:00:00Z");
  const start =
    days === 0
      ? ""
      : new Date(end - (days - 1) * 86400000).toISOString().slice(0, 10);
  const totals = {
    total: 0,
    input: 0,
    output: 0,
    cacheRead: 0,
    cacheWrite: 0,
    requests: 0,
    sessions: 0,
    unmeasured: 0,
  };
  const sessions = new Set(),
    models = new Map(),
    projects = new Map(),
    daily = new Map();
  for (const row of rows) {
    const day = dateKey(row.time, timeZone);
    if (day > today) continue;
    const entry = daily.get(day) ?? {
      date: day,
      total: 0,
      input: 0,
      output: 0,
      cacheRead: 0,
      cacheWrite: 0,
      requests: 0,
      unmeasured: 0,
    };
    for (const key of ["total", "input", "output", "cacheRead", "cacheWrite"])
      entry[key] += row[key];
    entry.requests++;
    if (!row.measured) entry.unmeasured++;
    daily.set(day, entry);
    if (start && day < start) continue;
    for (const key of ["total", "input", "output", "cacheRead", "cacheWrite"])
      totals[key] += row[key];
    totals.requests++;
    if (!row.measured) totals.unmeasured++;
    sessions.add(row.sessionId);
    const modelKey = JSON.stringify([row.provider, row.model]);
    const model = models.get(modelKey) ?? {
      provider: row.provider,
      model: row.model,
      total: 0,
      requests: 0,
    };
    model.total += row.total;
    model.requests++;
    models.set(modelKey, model);
    const project = projects.get(row.project) ?? {
      project: row.project,
      total: 0,
      requests: 0,
    };
    project.total += row.total;
    project.requests++;
    projects.set(row.project, project);
  }
  totals.sessions = sessions.size;
  const prompt = totals.input + totals.cacheRead + totals.cacheWrite;
  return {
    totals,
    cacheHitRate: prompt ? totals.cacheRead / prompt : null,
    models: [...models.values()].sort((a, b) => b.total - a.total),
    projects: [...projects.values()].sort((a, b) => b.total - a.total),
    daily: [...daily.values()].sort((a, b) => a.date.localeCompare(b.date)),
    today,
    timeZone,
    days,
    updatedAt: now,
  };
}
