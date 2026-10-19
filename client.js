window.__ModuleLoader__.load({
  id: "dsh-tokendashboard",
  factory(require) {
    const React = require("react");
    const h = React.createElement;
    const NS = "local.traffic-monitor";
    const zh = {
      title: "用量统计",
      subtitle: "跨会话统计本机 Token 消耗，数据来自本地会话日志",
      days7: "近 7 天",
      days30: "近 30 天",
      days90: "近 90 天",
      all: "全部",
      refresh: "刷新",
      total: "总 Token",
      input: "输入",
      output: "输出",
      cacheRead: "缓存读",
      hit: "缓存命中率",
      counts: "{requests} 次请求 · {sessions} 个会话",
      calendar: "活跃日历",
      calendarHint: "近 52 周每日 Token 消耗",
      trend: "每日趋势",
      trendHint: "每日输入 Token · 缓存构成",
      models: "按模型 / 供应商",
      modelHint: "按 Token 排序",
      projects: "按项目",
      projectHint: "按工作目录聚合",
      less: "少",
      more: "多",
      loading: "正在读取本地用量…",
      error: "无法读取用量，请刷新重试。",
      partial: "{count} 个会话读取失败，当前统计不完整。",
      unmeasured: "{count} 次请求未报告用量；Token 仅汇总已报告的数据。",
      empty: "此范围内暂无请求记录",
      updated: "更新于 {time}",
      auto: "每 30 秒自动刷新",
      unknown: "未记录",
      noProject: "未记录工作目录",
      explanation:
        "输入不含缓存。总量优先采用供应商 totalTokens，否则累加输入、输出、缓存读写；推理 Token 不重复相加。缓存命中率 = 缓存读 ÷（输入 + 缓存读 + 缓存写）。仅统计已结算请求，分叉继承记录不重复计费。API 调用次数包含已结算的失败尝试与未报告用量的请求。日历显示近 52 周，趋势可独立缩放至近 7–30 天。",
      prompt: "全部输入",
      apiCalls: "API 调用次数",
      calls: "{count} 次调用",
      sessions: "{count} 个会话",
      cacheMiss: "缓存未命中",
      zoom: "横坐标缩放",
      visibleDays: "{count} 天",
      month: "1 个月",
      trendNote:
        "柱高为输入 Token：命中 = 缓存读，未命中 = 普通输入 + 缓存写。输出仅计入总 Token。",
      monday: "一",
      wednesday: "三",
      friday: "五",
      sunday: "日",
      retry: "重试",
    };
    const en = {
      title: "Usage statistics",
      subtitle:
        "Local token consumption across sessions, derived from session logs",
      days7: "Last 7 days",
      days30: "Last 30 days",
      days90: "Last 90 days",
      all: "All time",
      refresh: "Refresh",
      total: "Total tokens",
      input: "Input",
      output: "Output",
      cacheRead: "Cache read",
      hit: "Cache hit rate",
      counts: "{requests} requests · {sessions} sessions",
      calendar: "Activity calendar",
      calendarHint: "Daily tokens over 52 weeks",
      trend: "Daily trend",
      trendHint: "Daily input tokens · cache breakdown",
      models: "By model / provider",
      modelHint: "Sorted by tokens",
      projects: "By project",
      projectHint: "Grouped by working directory",
      less: "Less",
      more: "More",
      loading: "Reading local usage…",
      error: "Unable to read usage. Refresh to retry.",
      partial: "{count} sessions could not be read. Statistics are incomplete.",
      unmeasured:
        "{count} requests did not report usage; token totals include reported data only.",
      empty: "No requests in this range",
      updated: "Updated {time}",
      auto: "Refresh every 30 seconds",
      unknown: "Not recorded",
      noProject: "No working directory",
      explanation:
        "Input excludes cache traffic. Totals use provider totalTokens when available, otherwise input + output + cache read + cache write. Reasoning is not added again. Hit rate = cache read / (input + cache read + cache write). Settled requests only; inherited fork records are excluded. API calls include settled failed attempts and requests without usage. Calendar shows 52 weeks; trend zooms independently from 7 to 30 days.",
      prompt: "All input",
      apiCalls: "API calls",
      calls: "{count} calls",
      sessions: "{count} sessions",
      cacheMiss: "Cache miss",
      zoom: "Horizontal zoom",
      visibleDays: "{count} days",
      month: "1 month",
      trendNote:
        "Bars show input tokens: hit = cache read; miss = uncached input + cache write. Output is included only in total tokens.",
      monday: "M",
      wednesday: "W",
      friday: "F",
      sunday: "S",
      retry: "Retry",
    };
    const css = `
      .dsh-tm {
        --tm-accent: var(--dsw-alias-state-business-primary);
        --tm-border: var(--dsw-alias-border-l2);
        --tm-miss: var(--dsw-alias-label-tertiary);
        --tm-muted: color-mix(
          in srgb,
          var(--dsw-alias-label-primary) 60%,
          var(--dsw-alias-bg-base)
        );
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding: 32px clamp(16px, 3vw, 48px);
        color: var(--dsw-alias-label-primary);
        background: var(--dsw-alias-bg-base);
        font-family: inherit;
        font-size: 14px;
        line-height: 1.5;
      }
      .dsh-tm * {
        box-sizing: border-box;
      }
      .dsh-tm-content {
        max-width: 1440px;
        margin: 0 auto;
      }
      .dsh-tm h1 {
        font-size: 26px;
        line-height: 1.3;
        margin: 0 0 8px;
        font-weight: 700;
        letter-spacing: -0.5px;
      }
      .dsh-tm p {
        margin: 0;
        color: var(--tm-muted);
      }
      .dsh-tm header p {
        font-size: 13px;
      }
      .dsh-tm header {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        align-items: center;
        margin-bottom: 32px;
        flex-wrap: wrap;
      }
      .dsh-tm-tools {
        display: flex;
        gap: 16px;
        align-items: center;
        flex-wrap: wrap;
      }
      .dsh-tm button {
        font: inherit;
        color: var(--tm-muted);
        border: 0;
        background: transparent;
        border-radius: 0;
        padding: 9px 12px;
        min-height: 40px;
        cursor: pointer;
      }
      .dsh-tm button:hover {
        background: var(--dsw-alias-interactive-bg-hover);
        color: var(--dsw-alias-label-primary);
      }
      .dsh-tm button[aria-pressed="true"] {
        color: var(--tm-accent);
        font-weight: 600;
        border-bottom-color: var(--tm-accent);
      }
      .dsh-tm :focus-visible {
        outline: 2px solid var(--tm-accent);
        outline-offset: 3px;
      }
      .dsh-tm button:disabled {
        opacity: 0.55;
        cursor: wait;
      }
      .dsh-tm-range {
        display: flex;
        border-bottom: 1px solid var(--tm-border);
        gap: 4px;
      }
      .dsh-tm-range button {
        border-bottom: 2px solid transparent;
        padding: 8px 12px;
        min-height: 40px;
        margin-bottom: -1px;
      }
      .dsh-tm-muted {
        color: var(--tm-muted);
        font-size: 12px;
        font-weight: 400;
      }
      .dsh-tm-cards {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 0;
        margin-bottom: 36px;
        padding: 8px 0 24px;
        border-bottom: 1px solid var(--tm-border);
      }
      .dsh-tm-card {
        padding: 0 20px;
        border: 0;
        border-left: 1px solid var(--tm-border);
        min-width: 0;
        background: transparent;
        border-radius: 0;
      }
      .dsh-tm-card:first-child {
        border-left: 0;
        padding-left: 0;
      }
      .dsh-tm-card > .dsh-tm-muted:first-child {
        color: var(--tm-muted);
        font-size: 12px;
        font-weight: 500;
      }
      .dsh-tm-card:first-child .dsh-tm-value {
        color: var(--tm-accent);
      }
      .dsh-tm-value {
        font-size: clamp(24px, 2.3vw, 32px);
        line-height: 1.25;
        font-weight: 700;
        letter-spacing: -0.7px;
        margin: 12px 0 8px;
        font-variant-numeric: tabular-nums;
      }
      .dsh-tm-panel {
        border: 0;
        border-radius: 0;
        background: transparent;
        margin-bottom: 36px;
        padding: 0;
        min-width: 0;
      }
      .dsh-tm-section-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }
      .dsh-tm h2 {
        font-size: 16px;
        font-weight: 650;
        margin: 0;
      }
      .dsh-tm-section-title > .dsh-tm-muted {
        color: var(--dsw-alias-label-tertiary);
      }
      .dsh-tm-scroll {
        overflow-x: auto;
        padding: 4px 4px 8px;
      }
      .dsh-tm-heat {
        min-width: 780px;
        display: grid;
        grid-template-columns: 24px repeat(53, minmax(10px, 1fr));
        grid-template-rows: 20px repeat(7, auto);
        gap: 4px;
        align-items: center;
      }
      .dsh-tm-heat small {
        font-size: 11px;
        color: var(--tm-muted);
      }
      .dsh-tm-cell {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 3px;
        background: color-mix(
          in srgb,
          var(--tm-accent) var(--heat),
          var(--dsw-alias-bg-module-platform)
        );
      }
      .dsh-tm-cell:hover {
        outline: 2px solid var(--tm-accent);
        outline-offset: 1px;
      }
      .dsh-tm-legend {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        align-items: center;
        margin-top: 12px;
        flex-wrap: wrap;
      }
      .dsh-tm-swatch {
        width: 12px;
        height: 12px;
        border-radius: 3px;
        background: color-mix(
          in srgb,
          var(--tm-accent) var(--heat),
          var(--dsw-alias-bg-module-platform)
        );
      }
      .dsh-tm-trend-tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 24px;
      }
      .dsh-tm-trend-tools .dsh-tm-legend {
        margin: 0;
      }
      .dsh-tm-zoom {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      .dsh-tm-zoom input {
        width: 140px;
        min-height: 32px;
        accent-color: var(--tm-accent);
        cursor: ew-resize;
      }
      .dsh-tm-zoom output {
        min-width: 48px;
        text-align: right;
        font-weight: 600;
        color: var(--dsw-alias-label-primary);
        font-variant-numeric: tabular-nums;
      }
      .dsh-tm-key {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .dsh-tm-dot {
        width: 9px;
        height: 9px;
        display: inline-block;
        background: var(--tm-accent);
      }
      .dsh-tm-dot.miss {
        background: var(--tm-miss);
      }
      .dsh-tm-plot {
        display: flex;
        gap: 12px;
        padding-top: 8px;
      }
      .dsh-tm-axis {
        position: relative;
        height: 180px;
        flex-shrink: 0;
        text-align: right;
        font-size: 11px;
        font-variant-numeric: tabular-nums;
        color: var(--tm-muted);
      }
      .dsh-tm-axis span {
        position: absolute;
        right: 0;
        transform: translateY(-50%);
        white-space: nowrap;
      }
      .dsh-tm-axis span:last-child {
        color: var(--dsw-alias-label-primary);
        font-weight: 600;
      }
      .dsh-tm-plot-scroll {
        flex: 1;
        min-width: 0;
        padding: 0 0 8px;
      }
      .dsh-tm-bars {
        position: relative;
        display: grid;
        grid-template-columns: repeat(var(--days), minmax(12px, 1fr));
        gap: clamp(3px, 0.8vw, 12px);
        min-width: calc(var(--days) * 14px);
        height: 208px;
        align-items: end;
      }
      .dsh-tm-grid {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 180px;
        pointer-events: none;
      }
      .dsh-tm-grid-line {
        position: absolute;
        left: 0;
        right: 0;
        border-top: 1px solid var(--tm-border);
      }
      .dsh-tm-zero {
        border-top-color: var(--dsw-alias-label-tertiary);
      }
      .dsh-tm-day {
        position: relative;
        height: 100%;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
      }
      .dsh-tm-bar-slot {
        height: 180px;
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }
      .dsh-tm-bar {
        width: 70%;
        max-width: 48px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        overflow: hidden;
        border-radius: 0;
      }
      .dsh-tm-bar-hit {
        background: var(--tm-accent);
      }
      .dsh-tm-bar-miss {
        background: var(--tm-miss);
      }
      .dsh-tm-day:hover .dsh-tm-bar {
        filter: brightness(1.15);
      }
      .dsh-tm-day small {
        height: 28px;
        padding-top: 8px;
        white-space: nowrap;
        font-size: 10px;
        color: var(--tm-muted);
      }
      .dsh-tm-tooltip {
        position: fixed;
        z-index: 1000;
        width: 264px;
        max-width: calc(100vw - 24px);
        padding: 14px 16px;
        background: var(--dsw-alias-bg-layer-3);
        border: 1px solid var(--dsw-alias-border-l4);
        box-shadow: 0 4px 16px #00000018;
        border-radius: 2px;
        pointer-events: none;
        font-size: 12px;
      }
      .dsh-tm-tooltip strong {
        display: block;
        margin-bottom: 8px;
        font-size: 13px;
        font-weight: 650;
      }
      .dsh-tm-tooltip-row {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin-top: 4px;
        font-variant-numeric: tabular-nums;
      }
      .dsh-tm-tooltip-row span:first-child {
        color: var(--tm-muted);
      }
      .dsh-tm-tooltip-row span:last-child {
        font-weight: 600;
      }
      .dsh-tm-rankings {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        border-top: 1px solid var(--tm-border);
        padding-top: 28px;
      }
      .dsh-tm-row {
        display: grid;
        grid-template-columns: minmax(90px, 1fr) minmax(40px, 0.7fr) 90px;
        align-items: center;
        gap: 12px;
        padding: 14px 0;
        border-bottom: 1px solid var(--tm-border);
      }
      .dsh-tm-row:last-child {
        border-bottom: 0;
      }
      .dsh-tm-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        font-weight: 500;
      }
      .dsh-tm-track {
        height: 4px;
        overflow: hidden;
        background: var(--dsw-alias-bg-module-platform);
      }
      .dsh-tm-fill {
        height: 100%;
        background: var(--tm-accent);
      }
      .dsh-tm-num {
        text-align: right;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .dsh-tm-num small {
        display: block;
        color: var(--tm-muted);
        font-size: 11px;
        font-weight: 400;
      }
      .dsh-tm-note {
        margin: 16px 0 0 !important;
        font-size: 12px;
        line-height: 1.8;
        color: var(--dsw-alias-label-tertiary) !important;
      }
      .dsh-tm-warning {
        padding: 12px 16px;
        border-left: 2px solid var(--tm-accent);
        margin-bottom: 16px;
        background: var(--dsw-alias-bg-module-platform);
      }
      .dsh-tm-empty {
        padding: 28px 0;
        text-align: center;
        color: var(--tm-muted);
      }
      .dsh-tm-footer {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        margin: 8px 0;
      }
      .dsh-tm-footer label {
        display: flex;
        align-items: center;
        gap: 6px;
        min-height: 32px;
      }
      .dsh-tm-footer input {
        accent-color: var(--tm-accent);
      }
      @media (max-width: 1200px) {
        .dsh-tm-cards {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          row-gap: 24px;
        }
        .dsh-tm-card:nth-child(4) {
          border-left: 0;
          padding-left: 0;
        }
      }
      @media (max-width: 850px) {
        .dsh-tm-rankings {
          grid-template-columns: 1fr;
          gap: 0;
        }
      }
      @media (max-width: 600px) {
        .dsh-tm {
          padding: 24px 16px;
        }
        .dsh-tm-cards {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .dsh-tm-card {
          padding: 0 16px;
        }
        .dsh-tm-card:nth-child(4) {
          border-left: 1px solid var(--tm-border);
          padding-left: 16px;
        }
        .dsh-tm-card:nth-child(odd) {
          border-left: 0;
          padding-left: 0;
        }
        .dsh-tm-tools {
          font-size: 12px;
        }
        .dsh-tm-trend-tools {
          align-items: flex-start;
        }
        .dsh-tm-row {
          grid-template-columns: minmax(70px, 1fr) 50px 80px;
        }
      }
    `;
    const compact = (number) =>
      new Intl.NumberFormat(undefined, {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(number);
    const axisNumber = (number) =>
      new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(number);
    const dayAt = (value) => new Date(value).toISOString().slice(0, 10);
    function Icon({ size = 20 }) {
      return h(
        "svg",
        {
          width: size,
          height: size,
          viewBox: "0 0 24 24",
          fill: "currentColor",
          "aria-hidden": true,
        },
        h("rect", { x: 3, y: 13, width: 4, height: 8, rx: 1 }),
        h("rect", { x: 10, y: 8, width: 4, height: 13, rx: 1 }),
        h("rect", { x: 17, y: 3, width: 4, height: 18, rx: 1 }),
      );
    }
    function useChartTooltip(t) {
      const [active, setActive] = React.useState(null);
      const id = React.useId();
      const close = React.useCallback(() => setActive(null), []);
      React.useEffect(() => {
        window.addEventListener?.("resize", close);
        return () => window.removeEventListener?.("resize", close);
      }, [close]);
      const bind = (item) => {
        const show = (event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setActive({
            item,
            left: Math.max(
              12,
              Math.min(rect.left, (window.innerWidth || 1024) - 280),
            ),
            top: Math.max(
              12,
              Math.min(rect.bottom + 8, (window.innerHeight || 768) - 210),
            ),
          });
        };
        return {
          tabIndex: 0,
          onMouseEnter: show,
          onMouseLeave: close,
          onFocus: show,
          onBlur: close,
          onKeyDown: (event) => {
            if (event.key === "Escape") close();
          },
          "aria-label": `${item.date}: ${t("total")} ${item.total.toLocaleString()}, ${t("calls", { count: item.requests })}`,
          "aria-describedby": active?.item.date === item.date ? id : undefined,
        };
      };
      const tooltip =
        active &&
        h(
          "div",
          {
            id,
            role: "tooltip",
            className: "dsh-tm-tooltip",
            style: { left: active.left, top: active.top },
          },
          h("strong", null, active.item.date),
          [
            ["total", active.item.total],
            ["cacheRead", active.item.cacheRead],
            ["cacheMiss", active.item.input + active.item.cacheWrite],
            ["output", active.item.output],
            ["apiCalls", active.item.requests],
          ].map(([key, value]) =>
            h(
              "div",
              { key, className: "dsh-tm-tooltip-row" },
              h("span", null, t(key)),
              h("span", null, value.toLocaleString()),
            ),
          ),
          active.item.unmeasured > 0 &&
            h(
              "p",
              { className: "dsh-tm-muted" },
              t("unmeasured", { count: active.item.unmeasured }),
            ),
        );
      return { bind, close, tooltip };
    }
    const emptyDay = (date) => ({
      date,
      total: 0,
      input: 0,
      output: 0,
      cacheRead: 0,
      cacheWrite: 0,
      requests: 0,
      unmeasured: 0,
    });
    function Calendar({ data, t, tip }) {
      const end = Date.parse(data.today + "T00:00:00Z");
      const weekday = (new Date(end).getUTCDay() + 6) % 7;
      const start = end - (52 * 7 + weekday) * 86400000;
      const map = new Map(data.daily.map((item) => [item.date, item]));
      const maximum = Math.max(
        1,
        ...data.daily
          .filter((item) => item.date >= dayAt(start))
          .map((item) => item.total),
      );
      const cells = [];
      for (const [row, key] of [
        [0, "monday"],
        [2, "wednesday"],
        [4, "friday"],
        [6, "sunday"],
      ])
        cells.push(
          h(
            "small",
            { key, style: { gridColumn: 1, gridRow: row + 2 } },
            t(key),
          ),
        );
      let month = "";
      for (let week = 0; week < 53; week++) {
        const weekTime = start + week * 7 * 86400000;
        const label = new Intl.DateTimeFormat(undefined, {
          month: "short",
          timeZone: "UTC",
        }).format(weekTime);
        if (label !== month) {
          cells.push(
            h(
              "small",
              {
                key: "m" + week,
                style: {
                  gridColumn: `${week + 2} / span ${Math.min(3, 53 - week)}`,
                  gridRow: 1,
                },
              },
              label,
            ),
          );
          month = label;
        }
        for (let day = 0; day < 7; day++) {
          const time = weekTime + day * 86400000;
          if (time > end) continue;
          const date = dayAt(time),
            item = map.get(date) ?? emptyDay(date);
          cells.push(
            h("div", {
              ...tip.bind(item),
              key: date,
              className: "dsh-tm-cell",
              role: "img",
              style: {
                gridColumn: week + 2,
                gridRow: day + 2,
                "--heat": `${item.total ? 24 + 66 * Math.sqrt(item.total / maximum) : 0}%`,
              },
            }),
          );
        }
      }
      return h(
        React.Fragment,
        null,
        h(
          "div",
          { className: "dsh-tm-scroll", onScroll: tip.close },
          h("div", { className: "dsh-tm-heat" }, cells),
        ),
        h(
          "div",
          { className: "dsh-tm-legend dsh-tm-muted" },
          t("less"),
          [0, 28, 45, 65, 90].map((value) =>
            h("i", {
              key: value,
              className: "dsh-tm-swatch",
              style: { "--heat": value + "%" },
            }),
          ),
          t("more"),
        ),
      );
    }
    function Trend({ data, t, tip, days, setDays }) {
      const zoomId = React.useId();
      const end = Date.parse(data.today + "T00:00:00Z");
      const map = new Map(data.daily.map((item) => [item.date, item]));
      const entries = Array.from({ length: days }, (_, index) => {
        const date = dayAt(end - (days - 1 - index) * 86400000);
        return map.get(date) ?? emptyDay(date);
      });
      const peak = Math.max(
        1,
        ...entries.map((item) => item.input + item.cacheRead + item.cacheWrite),
      );
      const magnitude = 10 ** Math.floor(Math.log10(peak / 4));
      const step = Math.max(
        1,
        Math.ceil(
          [1, 2, 2.5, 5, 10].find((value) => value * magnitude >= peak / 4) *
            magnitude,
        ),
      );
      const intervals = Math.max(2, Math.ceil(peak / step));
      const maximum = intervals * step;
      const ticks = Array.from({ length: intervals + 1 }, (_, index) => ({
        value: maximum - index * step,
        top: `${(100 * index) / intervals}%`,
      }));
      return h(
        React.Fragment,
        null,
        h(
          "div",
          { className: "dsh-tm-trend-tools" },
          h(
            "div",
            { className: "dsh-tm-legend dsh-tm-muted" },
            [
              ["cacheRead", ""],
              ["cacheMiss", "miss"],
            ].map(([key, cls]) =>
              h(
                "span",
                { key, className: "dsh-tm-key" },
                h("i", { className: "dsh-tm-dot " + cls }),
                t(key),
              ),
            ),
          ),
          h(
            "div",
            { className: "dsh-tm-zoom dsh-tm-muted" },
            h("label", { htmlFor: zoomId }, t("zoom")),
            h("span", null, t("visibleDays", { count: 7 })),
            h("input", {
              id: zoomId,
              type: "range",
              min: 7,
              max: 30,
              step: 1,
              value: days,
              "aria-valuetext": t("visibleDays", { count: days }),
              onChange: (event) => {
                tip.close();
                setDays(Number(event.target.value));
              },
            }),
            h("span", null, t("month")),
            h("output", { htmlFor: zoomId }, t("visibleDays", { count: days })),
          ),
        ),
        h(
          "div",
          { className: "dsh-tm-plot" },
          h(
            "div",
            {
              className: "dsh-tm-axis",
              "aria-hidden": true,
              style: {
                width: `${Math.max(...ticks.map((tick) => axisNumber(tick.value).length)) + 1}ch`,
              },
            },
            ticks.map((tick) =>
              h(
                "span",
                {
                  key: tick.value,
                  "data-value": tick.value,
                  style: { top: tick.top },
                },
                axisNumber(tick.value),
              ),
            ),
          ),
          h(
            "div",
            {
              className: "dsh-tm-scroll dsh-tm-plot-scroll",
              onScroll: tip.close,
            },
            h(
              "div",
              { className: "dsh-tm-bars", style: { "--days": days } },
              h(
                "div",
                { className: "dsh-tm-grid", "aria-hidden": true },
                ticks.map((tick) =>
                  h("div", {
                    key: tick.value,
                    className:
                      "dsh-tm-grid-line" +
                      (tick.value === 0 ? " dsh-tm-zero" : ""),
                    style: { top: tick.top },
                  }),
                ),
              ),
              entries.map((item, index) => {
                const total = item.input + item.cacheRead + item.cacheWrite;
                const miss = item.input + item.cacheWrite;
                return h(
                  "div",
                  {
                    ...tip.bind(item),
                    key: item.date,
                    className: "dsh-tm-day",
                    role: "img",
                  },
                  h(
                    "div",
                    { className: "dsh-tm-bar-slot" },
                    h(
                      "div",
                      {
                        className: "dsh-tm-bar",
                        style: { height: `${(180 * total) / maximum}px` },
                      },
                      h("div", {
                        className: "dsh-tm-bar-hit",
                        style: {
                          height: `${total ? (100 * item.cacheRead) / total : 0}%`,
                        },
                      }),
                      h("div", {
                        className: "dsh-tm-bar-miss",
                        style: {
                          height: `${total ? (100 * miss) / total : 0}%`,
                        },
                      }),
                    ),
                  ),
                  h(
                    "small",
                    null,
                    days <= 14 || index % 4 === 0 || index === days - 1
                      ? item.date.slice(5).replace("-", "/")
                      : "",
                  ),
                );
              }),
            ),
          ),
        ),
        entries.every((item) => item.requests === 0) &&
          h("div", { className: "dsh-tm-empty" }, t("empty")),
        h("p", { className: "dsh-tm-note" }, t("trendNote")),
      );
    }
    function Panel({ title, hint, children }) {
      return h(
        "section",
        { className: "dsh-tm-panel" },
        h(
          "div",
          { className: "dsh-tm-section-title" },
          h("h2", null, title),
          h("span", { className: "dsh-tm-muted" }, hint),
        ),
        children,
      );
    }
    function Ranking({ items, model, t }) {
      const maximum = Math.max(1, ...items.map((item) => item.total));
      return items.length
        ? items.map((item, index) => {
            const label = model
              ? `${item.model || t("unknown")} · ${item.provider || t("unknown")}`
              : item.project || t("noProject");
            return h(
              "div",
              { className: "dsh-tm-row", key: index },
              h("span", { className: "dsh-tm-label", title: label }, label),
              h(
                "div",
                { className: "dsh-tm-track" },
                h("div", {
                  className: "dsh-tm-fill",
                  style: { width: `${(100 * item.total) / maximum}%` },
                }),
              ),
              h(
                "span",
                { className: "dsh-tm-num", title: item.total.toLocaleString() },
                compact(item.total),
                h(
                  "small",
                  null,
                  t("calls", { count: item.requests.toLocaleString() }),
                ),
              ),
            );
          })
        : h("div", { className: "dsh-tm-empty" }, t("empty"));
    }
    function Dashboard({ t }) {
      const [days, setDays] = React.useState(30),
        [auto, setAuto] = React.useState(true);
      const [trendDays, setTrendDays] = React.useState(30);
      const tip = useChartTooltip(t);
      const [state, setState] = React.useState({
        data: null,
        loading: true,
        error: false,
      });
      const request = React.useRef(null),
        serial = React.useRef(0);
      const load = React.useCallback(async () => {
        request.current?.abort();
        const controller = new AbortController(),
          current = ++serial.current;
        request.current = controller;
        setState((old) => ({ ...old, loading: true, error: false }));
        try {
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const response = await fetch(
            `/api/local-traffic-monitor?days=${days}&timeZone=${encodeURIComponent(timeZone)}`,
            {
              headers: { "X-DSH-Traffic-Monitor": "1" },
              signal: controller.signal,
            },
          );
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          if (current === serial.current)
            setState({ data, loading: false, error: false });
        } catch (error) {
          if (!controller.signal.aborted && current === serial.current)
            setState({ data: null, loading: false, error: true });
        }
      }, [days]);
      React.useEffect(() => {
        void load();
        const timer = auto
          ? setInterval(() => {
              if (!document.hidden && !request.current?.signal.aborted)
                void load();
            }, 30000)
          : null;
        return () => {
          request.current?.abort();
          serial.current++;
          if (timer) clearInterval(timer);
        };
      }, [load, auto]);
      const data = state.data;
      React.useEffect(tip.close, [data, tip.close]);
      return h(
        "div",
        {
          className: "dsh-tm",
          "aria-busy": state.loading,
          onScrollCapture: tip.close,
        },
        h("style", null, css),
        h(
          "div",
          { className: "dsh-tm-content" },
          h(
            "header",
            null,
            h(
              "div",
              null,
              h("h1", null, t("title")),
              h("p", null, t("subtitle")),
            ),
            h(
              "div",
              { className: "dsh-tm-tools" },
              h(
                "div",
                { className: "dsh-tm-range" },
                [
                  [7, "days7"],
                  [30, "days30"],
                  [90, "days90"],
                  [0, "all"],
                ].map(([value, key]) =>
                  h(
                    "button",
                    {
                      key,
                      type: "button",
                      "aria-pressed": days === value,
                      onClick: () => {
                        if (days === value) return;
                        setState({ data: null, loading: true, error: false });
                        setDays(value);
                      },
                    },
                    t(key),
                  ),
                ),
              ),
              h(
                "button",
                { type: "button", onClick: load, disabled: state.loading },
                t("refresh"),
              ),
            ),
          ),
          state.error &&
            h(
              "div",
              { role: "alert", className: "dsh-tm-warning" },
              t("error"),
              " ",
              h("button", { type: "button", onClick: load }, t("retry")),
            ),
          state.loading &&
            !data &&
            h(
              "div",
              { role: "status", className: "dsh-tm-empty" },
              t("loading"),
            ),
          data &&
            h(
              React.Fragment,
              null,
              data.failures.length > 0 &&
                h(
                  "div",
                  { role: "alert", className: "dsh-tm-warning" },
                  t("partial", { count: data.failures.length }),
                ),
              data.totals.unmeasured > 0 &&
                h(
                  "div",
                  { className: "dsh-tm-warning" },
                  t("unmeasured", { count: data.totals.unmeasured }),
                ),
              h(
                "div",
                { className: "dsh-tm-cards" },
                [
                  ["total", data.totals.total],
                  ["apiCalls", data.totals.requests],
                  ["input", data.totals.input],
                  ["output", data.totals.output],
                  ["cacheRead", data.totals.cacheRead],
                  ["hit", data.cacheHitRate],
                ].map(([key, value]) =>
                  h(
                    "section",
                    { key, className: "dsh-tm-card" },
                    h("span", { className: "dsh-tm-muted" }, t(key)),
                    h(
                      "div",
                      {
                        className: "dsh-tm-value",
                        title: value?.toLocaleString(),
                      },
                      key === "hit"
                        ? value === null
                          ? "—"
                          : `${(value * 100).toFixed(1)}%`
                        : compact(value),
                    ),
                    key === "apiCalls" &&
                      h(
                        "span",
                        { className: "dsh-tm-muted" },
                        t("sessions", {
                          count: data.totals.sessions.toLocaleString(),
                        }),
                      ),
                    key === "total" &&
                      h(
                        "span",
                        { className: "dsh-tm-muted" },
                        t("counts", data.totals),
                      ),
                    key === "hit" &&
                      h(
                        "span",
                        { className: "dsh-tm-muted" },
                        `${t("cacheRead")} ${compact(data.totals.cacheRead)} / ${t("prompt")} ${compact(data.totals.input + data.totals.cacheRead + data.totals.cacheWrite)}`,
                      ),
                  ),
                ),
              ),
              h(
                Panel,
                { title: t("calendar"), hint: t("calendarHint") },
                h(Calendar, { data, t, tip }),
              ),
              h(
                Panel,
                { title: t("trend"), hint: t("trendHint") },
                h(Trend, {
                  data,
                  t,
                  tip,
                  days: trendDays,
                  setDays: setTrendDays,
                }),
              ),
              h(
                "div",
                { className: "dsh-tm-rankings" },
                h(
                  Panel,
                  { title: t("models"), hint: t("modelHint") },
                  h(Ranking, { items: data.models, model: true, t }),
                ),
                h(
                  Panel,
                  { title: t("projects"), hint: t("projectHint") },
                  h(Ranking, { items: data.projects, t }),
                ),
              ),
              h(
                "div",
                { className: "dsh-tm-footer dsh-tm-muted" },
                h(
                  "label",
                  null,
                  h("input", {
                    type: "checkbox",
                    checked: auto,
                    onChange: (event) => setAuto(event.target.checked),
                  }),
                  " ",
                  t("auto"),
                ),
                h(
                  "span",
                  null,
                  t("updated", {
                    time: new Date(data.updatedAt).toLocaleTimeString(),
                  }),
                  ` · ${data.timeZone}`,
                ),
              ),
              h("p", { className: "dsh-tm-note" }, t("explanation")),
            ),
          tip.tooltip,
        ),
      );
    }
    return {
      inject: ["slots", "locale"],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }));
        const t = ctx.locale.bind(NS);
        ctx.slots.inject("main", () =>
          ctx.slots.register(
            { name: "main", key: "local-traffic-monitor", locale: NS },
            Dashboard,
          ),
        );
        ctx.slots.inject("sidebar.panellist", () =>
          ctx.slots.register(
            {
              name: "sidebar.panellist",
              id: "local-traffic-monitor",
              order: 15,
              locale: NS,
              label: () => t("title"),
            },
            Icon,
          ),
        );
      },
    };
  },
});
