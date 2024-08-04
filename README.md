# Business Satellite for Grafana

![Datasource](https://github.com/VolkovLabs/business-satellite/raw/main/src/img/datasource.png)

![Grafana](https://img.shields.io/badge/Grafana-11.1-orange)
![CI](https://github.com/volkovlabs/business-satellite/workflows/CI/badge.svg)
![E2E](https://github.com/volkovlabs/business-satellite/workflows/E2E/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/business-satellite/branch/main/graph/badge.svg)](https://codecov.io/gh/VolkovLabs/business-satellite)
[![CodeQL](https://github.com/VolkovLabs/business-satellite/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/business-satellite/actions/workflows/codeql-analysis.yml)

## Introduction

The Business Satellite Data Source for Grafana allows retrieving data from local and remote Grafana instances via HTTP API.

[![Business Satellite data source | Easy access to Grafana backend | Includes Annotations tutorial](https://raw.githubusercontent.com/volkovlabs/business-satellite/main/img/overview.png)](https://youtu.be/0zibOEGqTJ8)

## Requirements

- Business Satellite Data Source 3.X requires **Grafana 10.2** or **Grafana 11**.
- Grafana HTTP API Data Source 2.X requires **Grafana 9** and **Grafana 10**.
- Grafana HTTP API Data Source 1.X requires **Grafana 8.5** and **Grafana 9**.

## Getting Started

The Business Satellite Data Source can be installed from the [Grafana Catalog](https://grafana.com/grafana/plugins/volkovlabs-grapi-datasource/) or utilizing the Grafana command line tool.

For the latter, use the following command.

```bash
grafana-cli plugins install volkovlabs-grapi-datasource
```

### Authentication

The Business Satellite Data Source requires a Grafana URL and a Token or API key to establish the connection to the organization and get relevant data.

## Highlights

- Connects to Local and Remote Grafana instances via HTTP API using API Keys and Tokens.
- Allows to get Health information.
- Allows to retrieve Annotations, Alerts, and Data Sources.

## Documentation

| Section                                                                                   | Description                                                  |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [Configuration](https://volkovlabs.io/plugins/volkovlabs-grapi-datasource/configuration/) | Explains configuration settings for the Data Source.         |
| [Provisioning](https://volkovlabs.io/plugins/volkovlabs-grapi-datasource/provisioning/)   | Demonstrates how to automatically provision the Data Source. |
| [Features](https://volkovlabs.io/plugins/volkovlabs-grapi-datasource/features/)           | Demonstrates panel features.                                 |
| [Release Notes](https://volkovlabs.io/plugins/volkovlabs-grapi-datasource/release/)       | Stay up to date with the latest features and updates.        |

## Business Suite for Grafana

The Business Suite is a collection of open source plugins created and actively maintained by Volkov Labs.

The collection aims to solve the most frequent business tasks by providing an intuitive interface with detailed written documentation, examples, and video tutorials.

[![Business Suite for Grafana](https://raw.githubusercontent.com/VolkovLabs/.github/main/business.png)](https://volkovlabs.io/plugins/)

## Feedback

We're looking forward to hearing from you. You can use different ways to get in touch with us.

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/business-satellite/issues/new/choose).
- Subscribe to our [YouTube Channel](https://www.youtube.com/@volkovlabs) and add a comment.
- Sponsor our open-source plugins for Grafana at [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Support our project by starring the repository.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/business-satellite/blob/main/LICENSE).
