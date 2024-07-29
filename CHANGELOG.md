# Change Log

## 3.2.0 (2024-07-29)

### Breaking changes

- Requires Grafana 10.2 and Grafana 11

### Features / Enhancements

- Added variables support in Dashboard Scene (#75)
- Added grafana alerts with states (#76)

## 3.1.0 (2024-07-16)

### Features / Enhancements

- Updated minimum Grafana version to 10.1.0 (#72)
- Added get dashboards meta request (#70)
- Added data source health check (#71, #73)

## 3.0.0 (2024-07-11)

### Breaking changes

- Requires Grafana 10.1 and Grafana 11

### Features / Enhancements

- Update Tutorial in README (#57)
- Update ESLint configuration and refactoring (#61)
- Add plugin e2e tests and remove cypress (#64)
- Prepared for Grafana 11 (#66)
- Updated E2E tests to use Docker (#68)
- Updated to Grafana 11.1.0 dependencies (#60, #69)

## 2.2.0 (2023-09-19)

### Features / Enhancements

- Move API methods under feature flag to support various Grafana versions (#53)
- Add an option to disable Alert Rules in Annotations (#55)
- Add a values field from annotation text (#30)

## 2.1.0 (2023-09-10)

### Features / Enhancements

- Refactor API and increase test coverage (#50)
- Update ESLint configuration (#50)
- Add Local mode to access local instance (#51)
- Add Organization Users (#52)

## 2.0.0 (2023-07-17)

### Breaking changes

- Requires Grafana 9 and Grafana 10

### Features / Enhancements

- Update to Grafana 10.0.2 (#31, #40, #45, #47)
- Add Annotations Tutorial to README (#33)
- Add Authentication to Getting Started (#36)
- Add exception handling for Alert Rules in Annotations (#39)
- Update tests with testing-library/react (#42)
- Add tests for Components and datasource (#44)
- Migrate to Plugin Tools 1.5.2 (#45)
- Update to Node 18 and npm (#45)
- Add E2E Cypress testing (#48)

## 1.2.0 (2023-03-30)

### Features / Enhancements

- Add formatted Annotation labels for Alerts (#19)
- Update Annotation Limit to 100 by default (#19)
- Add Alert Rules and UID for Alerts Annotations (#20)
- Update Scoped Variables for Annotations (#21)
- Add Variable Support (#25)
- Update provisioning for testing Alerts (#26, #28)
- Add Annotations Tutorial (#29)

## 1.1.0 (2023-03-15)

### Features / Enhancements

- Update to Grafana 9.4.3 (#13)
- Update Bearer token plugin configuration (#13)
- Signed as community plugin (#14)
- Update Grafana types and description (#15)

## 1.0.0 (2023-03-02)

### Features / Enhancements

- Initial release based on Volkov Labs Abc Data source template
- Update README and configuration (#1)
- Add Postgres for Alerting (#2)
- Add Annotations (#3)
- Update name to Grafana HTTP API (#4)
- Improve Annotations and update to Timescale (#5)
- Improve Data Source to check Organization (#6)
- Add Notifications and increase Test Coverage (#7)
- Add Annotation filters (#8)
- Add Annotation Alert States filter (#9)
- Add Health and Data Sources (#10)
- Update README to prepare for the release (#11, #12)
