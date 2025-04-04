# Business Satellite for Grafana

![Datasource](https://github.com/VolkovLabs/business-satellite/raw/main/src/img/datasource.png)

![Grafana](https://img.shields.io/badge/Grafana-11.6-orange)
![CI](https://github.com/volkovlabs/business-satellite/workflows/CI/badge.svg)
![E2E](https://github.com/volkovlabs/business-satellite/workflows/E2E/badge.svg)
[![Codecov](https://codecov.io/gh/VolkovLabs/business-satellite/branch/main/graph/badge.svg)](https://codecov.io/gh/VolkovLabs/business-satellite)
[![CodeQL](https://github.com/VolkovLabs/business-satellite/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/business-satellite/actions/workflows/codeql-analysis.yml)

## Overview

The **Business Satellite** data source plugin for Grafana enables seamless access to data from local and remote Grafana instances via the HTTP API. Designed for flexibility and ease of use, it integrates with Grafana to retrieve health information, annotations, alerts, and other data source details.

[![Watch Overview: Business Satellite Data Source | Access Grafana Backend Easily](https://raw.githubusercontent.com/volkovlabs/business-satellite/main/img/overview.png)](https://youtu.be/0zibOEGqTJ8)

## Compatibility

- **Version 3.x**: Requires Grafana 10.2 or Grafana 11.
- **Version 2.x**: Compatible with Grafana 9 and Grafana 10.
- **Version 1.x**: Works with Grafana 8.5 and Grafana 9.

## Installation

Install the Business Satellite data source from the [Grafana Plugin Catalog](https://grafana.com/grafana/plugins/volkovlabs-grapi-datasource/) or via the Grafana CLI:

```bash
grafana cli plugins install volkovlabs-grapi-datasource
```

Need help? Check out our installation guide:

[![Install Business Suite Plugins | Cloud, OSS, Enterprise](https://raw.githubusercontent.com/volkovlabs/.github/main/started.png)](https://youtu.be/1qYzHfPXJF8)

## Setup

To connect, provide a Grafana URL and an API key or token. This authenticates the plugin with your Grafana organization and enables data retrieval.

## Key Features

- Connects to local and remote Grafana instances via HTTP API.
- Retrieves health status, annotations, alerts, and data sources.
- Supports API keys and tokens for secure authentication.

## Documentation

Explore detailed guides and resources:

| Section                                                                          | Description                          |
| -------------------------------------------------------------------------------- | ------------------------------------ |
| [Configuration](https://volkovlabs.io/plugins/business-satellite/configuration/) | Set up the data source with ease.    |
| [Provisioning](https://volkovlabs.io/plugins/business-satellite/provisioning/)   | Automate setup for your environment. |
| [Features](https://volkovlabs.io/plugins/business-satellite/features/)           | Discover what the plugin can do.     |
| [Release Notes](https://volkovlabs.io/plugins/business-satellite/release/)       | Track updates and new features.      |

## Business Suite for Grafana

The Business Satellite plugin is part of the **Business Suite**, a collection of open-source plugins by [Volkov Labs](https://volkovlabs.io/). These tools solve common business challenges with intuitive interfaces, detailed docs, and video tutorials.

[![Explore the Business Suite](https://raw.githubusercontent.com/VolkovLabs/.github/main/business.png)](https://volkovlabs.io/plugins/)

### Enterprise Support

Upgrade to [Business Suite Enterprise](https://volkovlabs.io/pricing/) for premium support, including:

- Dedicated support via Zendesk.
- Priority feature requests and bug fixes.
- In-person consultations and Business Intelligence access.

## Get Involved

We’d love to hear from you:

- **Questions or Bugs**: File them on [GitHub Issues](https://github.com/volkovlabs/business-satellite/issues).
- **Stay Updated**: Subscribe to our [YouTube Channel](https://youtube.com/@volkovlabs).

## License

Licensed under the [Apache License 2.0](https://github.com/volkovlabs/business-satellite/blob/main/LICENSE).
