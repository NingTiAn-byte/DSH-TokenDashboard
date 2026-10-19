<div align="center">

# DSH-TokenDashboard

**Your local token usage, API calls, and cache activity in one dashboard.**

A lightweight plugin for DeepSeek Harness. No build step. No runtime dependencies. No additional API key.

[English](README.md) · [简体中文](README.zh-CN.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Runtime dependencies: 0](https://img.shields.io/badge/runtime_dependencies-0-brightgreen.svg)
![Built for DSH](https://img.shields.io/badge/built_for-DeepSeek_Harness-4D6BFE.svg)

[Features](#features) · [Quick start](#quick-start) · [How counting works](#how-counting-works) · [FAQ](#faq)

</div>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/overview-dark.png">
  <img src="docs/images/overview-light.png" alt="DSH-TokenDashboard showing token totals, API calls, an activity calendar, and daily cache trends">
</picture>

_Preview uses sample data. The plugin follows your DSH theme._

## Why DSH-TokenDashboard?

See how much you use across sessions, which projects drive token consumption, and how often your input hits the cache. The dashboard reads existing session logs in your current DSH profile and presents the results inside the native sidebar.

## Features

| Feature                      | What you get                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| Usage at a glance            | Total tokens, API calls, uncached input, output, cache reads, and cache hit rate              |
| Flexible summaries           | Last 7, 30, or 90 days, or all time, with active session counts                               |
| Activity calendar            | 52 weeks of square, rounded cells; hover or focus for exact daily numbers                     |
| Daily cache trends           | Stacked input tokens: cache misses below cache hits, with a visible zero baseline             |
| Adjustable chart range       | Zoom from 7 to 30 days; compact K/M/B axis labels                                             |
| Model and project breakdowns | Token rankings and API call counts by model/provider and working directory                    |
| Native presentation          | Light/dark themes, responsive layout, English and Simplified Chinese                          |
| Refresh controls             | Manual refresh or automatic refresh every 30 seconds; polling pauses while the page is hidden |

## Quick start

### 1. Install from GitHub

Use the DSH CLI available in your installation:

```sh
dsh plugin --profile web add github:NingTiAn-byte/DSH-TokenDashboard
```

The planned npm package name is `dsh-tokendashboard`; publication is pending. After it has been published, install it with:

```sh
dsh plugin --profile web add dsh-tokendashboard
```

### 2. Desktop or local installation

For Desktop, use the CLI bundled with the Desktop application:

```sh
dsh plugin --profile desktop add github:NingTiAn-byte/DSH-TokenDashboard
```

Alternatively, download **Code → Download ZIP**, extract it, and install the directory containing `package.json` through the DSH plugin manager or CLI:

```sh
dsh plugin --profile web add "/absolute/path/to/DSH-TokenDashboard"
```

On Windows, paths such as `C:/plugins/DSH-TokenDashboard` work as well. Quote paths that contain spaces. If `dsh` is not on PATH, use its installed executable or command file. The source CLI may reject the Desktop profile; use the Desktop-bundled CLI for that profile.

### 3. Open the dashboard

Restart DSH and select **Usage statistics** in the sidebar. Existing completed requests appear automatically; the plugin does not need to run a new model request.

> **Compatibility:** Requires DSH with `sessionPersistence`, `connection`, slot, locale, and theme APIs. DSH plugin APIs may change between releases; check compatibility with your installed version.

## Using the dashboard

- Select a summary range at the top. Summary metrics and rankings follow this range.
- Hover over or keyboard-focus a calendar cell or daily bar for exact usage and API call counts. Press **Escape** to dismiss the tooltip.
- Drag the trend slider to show the latest **7–30 days**. One month means a rolling 30-day window.
- Calendar history and the trend window are independent of the summary range. Changing that range preserves the trend zoom.
- Toggle automatic refresh at the bottom of the page.

## How counting works

| Metric         | Definition                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| Total tokens   | Provider-reported `totalTokens`, or uncached input + output + cache reads + cache writes when unavailable          |
| Input          | Uncached input only; excludes cache reads and writes                                                               |
| Output         | Provider-reported output; reasoning tokens are not added a second time                                             |
| Cache hit rate | Cache reads ÷ (uncached input + cache reads + cache writes); `—` when the denominator is zero                      |
| API calls      | Settled `assistant/message` and `assistant/attempt` records, including settled failures and attempts without usage |
| Daily bars     | Input only: cache miss = uncached input + cache writes; cache hit = cache reads                                    |
| Sessions       | Sessions with at least one settled request in the selected summary range                                           |

An in-progress request appears after settlement. Requests without usage increase the API call count but do not add estimated tokens. Repeated settlements for the same attempt are deduplicated; retry attempts count separately, and inherited fork records are excluded.

Days follow the browser's IANA time zone. Calendar weeks start on Monday. Output contributes to total tokens and tooltip details, but is not stacked in the input-cache chart.

## Data and privacy

The plugin reads local session logs through read-only handles. It does not modify logs, call model APIs, or upload usage data. Numeric summaries, model names, session IDs, and working directories are kept in memory for the dashboard; prompt and response content is not retained in that cache.

Each changed session is read in full before its numeric summary is cached by persistence revision. Very large logs can make the first load or a refresh slower. Unreadable sessions produce a visible partial-statistics warning.

This is a token accounting view, not a billing or network bandwidth meter. Provider billing may use different accounting rules.

## FAQ

### Why is the dashboard empty?

It only sees the session data source available to the current DSH profile. Complete a request in that profile, then refresh. Requests that are still streaming have not settled yet.

### Why do token totals differ from the provider's bill?

The dashboard uses usage reported in local logs and has no access to billing adjustments or external requests. It does not estimate missing usage or calculate monetary costs.

### Why doesn't the chart match the selected summary period?

The activity calendar always covers 52 weeks. The daily chart has its own 7–30 day window and displays input tokens only. The summary range applies to the headline metrics and rankings.

### How do I update or uninstall it?

Replace or reinstall the plugin files, then restart DSH. Remove or disable the plugin through the DSH plugin manager to uninstall it. Session logs remain unchanged.

## Project structure

```text
token-monitor/
├── client.js          # Dashboard, chart interactions, styles, and UI dictionaries
├── index.js           # Read-only route and session summary cache
├── usage.js           # Request deduplication and token aggregation
├── cordis.patch.yml   # DSH bundle registration
├── icon.svg           # Sidebar/plugin icon
├── locale/            # Plugin metadata translations
├── docs/images/       # Light and dark README previews
├── README.md
├── README.zh-CN.md
├── LICENSE
└── package.json
```

The client remains a single DSH module so the plugin can be installed directly without a bundler. React and DSH services are supplied by the host.

## Development and packaging

There are no dependencies to install and no compilation step. To check JavaScript syntax:

```sh
npm run check
```

To create an installable archive:

```sh
npm pack --ignore-scripts
```

The package manifest explicitly lists distributable files. Generated archives and local artifacts are ignored by Git. After editing, reinstall or reload the plugin as needed and verify it in your DSH profile.

## Contributing

Issues and pull requests are welcome. For a bug report, include your DSH version, profile type, reproduction steps, and expected/actual behavior. Remove prompts, credentials, session content, and private paths before sharing logs or screenshots.

## License

[MIT](LICENSE). This is a community plugin and is not an official DeepSeek product.

Maintainers: see [release and marketplace submission](docs/PUBLISHING.md).
