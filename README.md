# Grafana HTTP API Data Source for Grafana

![Datasource](https://github.com/VolkovLabs/volkovlabs-grapi-datasource/raw/main/src/img/datasource.png)

![Grafana 10](https://img.shields.io/badge/Grafana-10.0.2-orange)
![CI](https://github.com/volkovlabs/volkovlabs-grapi-datasource/workflows/CI/badge.svg)
![E2E](https://github.com/volkovlabs/volkovlabs-grapi-datasource/workflows/E2E/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-grapi-datasource/branch/main/graph/badge.svg)](https://codecov.io/gh/VolkovLabs/volkovlabs-grapi-datasource)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-grapi-datasource/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-grapi-datasource/actions/workflows/codeql-analysis.yml)

## Introduction

The Grafana HTTP API Data Source for Grafana allows retrieving data from local and remote Grafana instances via HTTP API.

[![Annotations and Alerts tutorial for Grafana with Timescale | How to and Demo to reveal the basics](https://raw.githubusercontent.com/volkovlabs/volkovlabs-grapi-datasource/main/img/tutorial.png)](https://youtu.be/bmOkirtC65w)

## Requirements

- **Grafana 9** and **Grafana 10** are required for major version 2.
- **Grafana 8.5** and **Grafana 9** are required for major version 1.

## Getting Started

The Grafana HTTP API Data Source can be installed from the [Grafana Catalog](https://grafana.com/grafana/plugins/volkovlabs-grapi-datasource/) or utilizing the Grafana command line tool.

For the latter, use the following command.

```bash
grafana-cli plugins install volkovlabs-grapi-datasource
```

### Authentication

The Grafana HTTP API Data source requires Grafana URL and a Token or API key to establish the connection to the organization and get relevant data.

## Highlights

- Connects to Local and Remote Grafana instances via HTTP API using API Keys and Tokens.
- Allows to get Health information.
- Allows to retrieve Annotations, Alerts, and Data Sources.

## Documentation

| Section                      | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| [Configuration](https://volkovlabs.io/plugins/volkovlabs-grapi-datasource/configuration/) | Explains configuration settings for the Data Source.         |
| [Provisioning](https://volkovlabs.io/plugins/volkovlabs-grapi-datasource/provisioning/) | Demonstrates how to automatically provision the Data Source. |
| [Features](https://volkovlabs.io/plugins/volkovlabs-grapi-datasource/features/)           | Demonstrates panel features.                                 |
| [Release Notes](https://volkovlabs.io/plugins/volkovlabs-grapi-datasource/release/)     | Stay up to date with the latest features and updates.        |

## Tutorial

This is an introductory video for anyone interested in Grafana Alerts and Annotations.

[![Annotations, Alerts, and Annotation queries in Grafana explained | HTTP API Data Source](https://raw.githubusercontent.com/volkovlabs/volkovlabs-grapi-datasource/main/img/annotations.png)](https://youtu.be/4asWJ_Dhcmw)

## Feedback

We're looking forward to hearing from you. You can use different ways to get in touch with us.

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-grapi-datasource/issues/new/choose).
- Subscribe to our [YouTube Channel](https://www.youtube.com/@volkovlabs) and add a comment.
- Sponsor our open-source plugins for Grafana at [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Support our project by starring the repository.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-grapi-datasource/blob/main/LICENSE).
