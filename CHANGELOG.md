# Change Log

## Introduction

This change log tracks updates to the Business Satellite data source plugin for Grafana, listing features, enhancements, and breaking changes with GitHub issue references. It supports Grafana’s HTTP API for dashboards, annotations, and alerts.

## 3.5.0 (2025-04-03)

### Features & Enhancements

- Added starred filtering to dashboard search request type (#88)
- Enabled filtering of annotation results using tags (#89)
- Upgraded to Grafana 11.5 and updated dependencies (#91)

## 3.4.0 (2024-12-25)

### Features & Enhancements

- Updated E2E tests for reliability (#83)
- Upgraded to Grafana 11.4 and updated dependencies (#84)

## 3.3.0 (2024-11-17)

### Features & Enhancements

- Upgraded to Grafana 11.3 and updated dependencies (#80)

## 3.2.0 (2024-07-29)

### Breaking Changes

- Requires Grafana 10.2 or Grafana 11

### Features & Enhancements

- Added variables support in Dashboard Scene (#75)
- Introduced Grafana alerts with state tracking (#76)

## 3.1.0 (2024-07-16)

### Features & Enhancements

- Raised minimum Grafana version to 10.1.0 (#72)
- Added request to retrieve dashboard metadata (#70)
- Implemented data source health check (#71, #73)

## 3.0.0 (2024-07-11)

### Breaking Changes

- Requires Grafana 10.1 or Grafana 11

### Features & Enhancements

- Updated tutorial in README (#57)
- Refactored code and updated ESLint configuration (#61)
- Added plugin E2E tests and removed Cypress (#64)
- Prepared for Grafana 11 (#66)
- Updated E2E tests to use Docker (#68)
- Upgraded to Grafana 11.1.0 dependencies (#60, #69)

## 2.2.0 (2023-09-19)

### Features & Enhancements

- Moved API methods under feature flags for Grafana version support (#53)
- Added option to disable Alert Rules in annotations (#55)
- Included values field from annotation text (#30)

## 2.1.0 (2023-09-10)

### Features & Enhancements

- Refactored API and increased test coverage (#50)
- Updated ESLint configuration (#50)
- Added local mode for accessing Grafana instance (#51)
- Added support for organization users (#52)

## 2.0.0 (2023-07-17)

### Breaking Changes

- Requires Grafana 9 or Grafana 10

### Features & Enhancements

- Upgraded to Grafana 10.0.2 (#31, #40, #45, #47)
- Added Annotations tutorial to README (#33)
- Included authentication in Getting Started section (#36)
- Added exception handling for Alert Rules in annotations (#39)
- Updated tests with `@testing-library/react` (#42)
- Added tests for components and data source (#44)
- Migrated to Plugin Tools 1.5.2 (#45)
- Updated to Node 18 and latest npm (#45)
- Introduced Cypress E2E testing (#48)

## 1.2.0 (2023-03-30)

### Features & Enhancements

- Added formatted labels for alerts and set default annotation limit to 100 (#19)
- Included Alert Rules and UID for annotations (#20)
- Updated scoped variables for annotations (#21)
- Added general variable support (#25)
- Enhanced provisioning for testing alerts (#26, #28)
- Added Annotations tutorial (#29)

## 1.1.0 (2023-03-15)

### Features & Enhancements

- Updated to Grafana 9.4.3 (#13)
- Improved Bearer token configuration (#13)
- Signed as community plugin (#14)
- Updated Grafana types and description (#15)

## 1.0.0 (2023-03-02)

### Features & Enhancements

- Initial release based on Volkov Labs ABC Data Source template
- Updated README and configuration (#1)
- Added Postgres support for alerting (#2)
- Introduced annotation functionality (#3)
- Renamed to Grafana HTTP API (#4)
- Improved annotations with Timescale support (#5)
- Enhanced data source to verify organization (#6)
- Added notifications and increased test coverage (#7)
- Added annotation filters (#8) and alert states filter (#9)
- Added health and data source checks (#10)
- Finalized README for release (#11, #12)
