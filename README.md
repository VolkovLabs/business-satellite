# Template to create a new Grafana data source plugin

![Datasource](https://github.com/VolkovLabs/volkovlabs-abc-datasource/raw/main/src/img/datasource.png)

[![Grafana 9](https://img.shields.io/badge/Grafana-9.3.6-orange)](https://www.grafana.com)
![CI](https://github.com/volkovlabs/volkovlabs-abc-datasource/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-abc-datasource/branch/main/graph/badge.svg?token=2W9VR0PG5N)](https://codecov.io/gh/VolkovLabs/volkovlabs-abc-datasource)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-abc-datasource/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-abc-datasource/actions/workflows/codeql-analysis.yml)

## Introduction

The Abc Data Source is a template we created to streamline our development process and gladly share with the Grafana community.

We created many Grafana data sources to this moment. To make the creation process efficient, starting with a well-constructed template is always easier.

Generate an application template with [https://github.com/VolkovLabs/volkovlabs-abc-datasource/generate](https://github.com/VolkovLabs/volkovlabs-abc-datasource/generate).

## Requirements

- **Grafana 8.5+, Grafana 9.0+** is required for version 2.X.
- **Grafana 8.0+** is required for version 1.X.

## Getting Started

1. Install packages

```bash
yarn install
```

2. Build the plugin

```bash
yarn build
```

3. Sign the plugins if required

```bash
export GRAFANA_API_KEY=erfdfsgfs==
yarn sign
```

4. Start the Docker container

```bash
yarn run start
```

## Features

- Use `docker-compose` to start the development environment with provisioned panels and a dashboard.
- Provides unit test configuration.
- Based on the latest version of Grafana.
- Includes GitHub Actions for CI and Release.

## Feedback

We love to hear from you. There are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-abc-datasource/issues/new/choose).
- Sponsor our open-source plugins for Grafana with [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Star the repository to show your support.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-abc-datasource/blob/main/LICENSE).
