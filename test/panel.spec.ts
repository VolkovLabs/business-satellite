import { test, expect } from '@grafana/plugin-e2e';
import { ConfigEditorHelper, QueryEditorHelper, PanelHelper } from './utils';
import { DataSourceOptions, RequestMode } from '../src/types';
test.describe('Grapi datasource', () => {
  test('Check grafana version', async ({ grafanaVersion }) => {
    console.log('Grafana version: ', grafanaVersion);
    expect(grafanaVersion).toEqual(grafanaVersion);
  });

  test.describe('Datasource config editor', () => {
    test('Should render config editor and elements', async ({
      createDataSourceConfigPage,
      readProvisionedDataSource,
      page,
      selectors,
    }) => {
      const datasource = await readProvisionedDataSource<DataSourceOptions>({ fileName: 'datasources.yaml' });
      const configPage = await createDataSourceConfigPage({ type: datasource.type });
      const configEditor = new ConfigEditorHelper(page, configPage, selectors);

      await configEditor.checkPresence();
      await configEditor.checkPresenceRequestModeOptions();
      await configEditor.checkPresenceTokenField();
      await configEditor.checkPresenceURLField();
    });

    test('"Save & test" should be successful when configuration is valid', async ({
      createDataSourceConfigPage,
      readProvisionedDataSource,
      selectors,
      page,
    }) => {
      const datasource = await readProvisionedDataSource<DataSourceOptions>({
        fileName: 'datasources.yaml',
      });
      const configPage = await createDataSourceConfigPage({ type: datasource.type });
      const configEditor = new ConfigEditorHelper(page, configPage, selectors);

      await configEditor.checkPresence();
      await configEditor.setMode(RequestMode.LOCAL);
      await configEditor.checkSaveSuccess();
    });

    test('"Save & test" should be failed if invalid path', async ({
      createDataSourceConfigPage,
      readProvisionedDataSource,
      selectors,
      page,
    }) => {
      const datasource = await readProvisionedDataSource<DataSourceOptions>({
        fileName: 'datasources.yaml',
      });
      const configPage = await createDataSourceConfigPage({ type: datasource.type });
      const configEditor = new ConfigEditorHelper(page, configPage, selectors);

      await configEditor.checkPresence();
      await configEditor.checkPresenceURLField();
      await configEditor.setMode(RequestMode.REMOTE);
      await configEditor.setPath('https:');
      await configEditor.checkSaveFail();
    });
  });

  test.describe('Variables editor', () => {
    test('Should render variable editor', async ({ variableEditPage, page, readProvisionedDataSource, selectors }) => {
      const ds = await readProvisionedDataSource({ fileName: 'datasources.yaml' });
      await variableEditPage.datasource.set(ds.name);
      const queryEditor = new QueryEditorHelper(page, variableEditPage, selectors);
      await queryEditor.checkPresence();
    });

    test('Should return values', async ({ variableEditPage, page, readProvisionedDataSource, selectors }) => {
      const ds = await readProvisionedDataSource({ fileName: 'datasources.yaml' });
      await variableEditPage.setVariableType('Query');
      await variableEditPage.datasource.set(ds.name);
      const queryEditor = new QueryEditorHelper(page, variableEditPage, selectors);
      await queryEditor.checkPresence();

      await queryEditor.checkRequestField();

      /**
       * set Datasource option
       */
      await queryEditor.changeRequestType('Returns data sources');

      await variableEditPage.runQuery();
      await expect(variableEditPage).toDisplayPreviews(['grapi', 'timescale']);
    });
  });

  test.describe('Provisioning', () => {
    test('Should return Data Sources', async ({ gotoDashboardPage, readProvisionedDashboard, selectors }) => {
      /**
       * Go To Panels dashboard panels.json
       * return dashboardPage
       */
      const dashboard = await readProvisionedDashboard({ fileName: 'panels.json' });
      const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

      const panel = new PanelHelper(dashboardPage, 'Data Sources', selectors);
      await panel.checkIfNoErrors();

      /**
       * Check data fields and value returned
       */
      await panel.checkFieldValues([
        'Id',
        'Org Id',
        'UID',
        'Name',
        'Type',
        'Type Logo URL',
        'Type Name',
        'Is Default',
        'Read Only',
        'URL',
        'User',
      ]);
      await panel.checkDataValues(['1', '1', 'grapi', 'Business Satellite', '2', '1', 'timescale', 'Timescale']);
    });

    test('Should return Annotations', async ({ gotoDashboardPage, readProvisionedDashboard, selectors }) => {
      /**
       * Go To Panels dashboard panels.json
       * return dashboardPage
       */
      const dashboard = await readProvisionedDashboard({ fileName: 'panels.json' });
      const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

      const panel = new PanelHelper(dashboardPage, 'Alert Rules', selectors);
      await panel.checkIfNoErrors();

      /**
       * Check data fields and value returned
       */
      await panel.checkFieldValues([
        'Id',
        'UID',
        'Org Id',
        'Rule Group',
        'Title',
        'Updated',
        'Folder UID',
        'Paused',
        'Evaluate For',
      ]);
    });
  });

  test.describe('Query editor', () => {
    test('Should show query editor', async ({ page, panelEditPage, readProvisionedDataSource, selectors }) => {
      const ds = await readProvisionedDataSource({ fileName: 'datasources.yaml' });
      await panelEditPage.datasource.set(ds.name);
      await panelEditPage.setVisualization('Table');

      const queryEditor = new QueryEditorHelper(page, panelEditPage, selectors);
      await queryEditor.checkPresence();
      await queryEditor.checkRequestField();
    });

    test('Should return data', async ({ page, panelEditPage, readProvisionedDataSource, selectors }) => {
      const ds = await readProvisionedDataSource({ fileName: 'datasources.yaml' });

      await panelEditPage.datasource.set(ds.name);
      await panelEditPage.setVisualization('Table');

      const queryEditor = new QueryEditorHelper(page, panelEditPage, selectors);

      await queryEditor.checkPresence();
      await queryEditor.checkRequestField();
      await queryEditor.changeRequestType('Returns data sources');

      /**
       * Check data fields and value returned
       */
      await expect(panelEditPage.panel.fieldNames).toContainText([
        'Id',
        'Org Id',
        'UID',
        'Name',
        'Type',
        'Type Logo URL',
        'Type Name',
        'Is Default',
        'Read Only',
        'URL',
        'User',
      ]);

      /**
       * Check data values should be one row
       */
      await expect(panelEditPage.panel.data).toContainText([
        '1',
        '1',
        'grapi',
        'Business Satellite',
        '2',
        '1',
        'timescale',
        'Timescale',
      ]);
    });
  });
});
