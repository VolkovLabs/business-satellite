import { Locator, Page } from '@playwright/test';
import { E2ESelectorGroups, expect, PanelEditPage, VariableEditPage } from '@grafana/plugin-e2e';
import { getLocatorSelectors, LocatorSelectors } from './selectors';
import { TEST_IDS } from '../../src/constants/tests';

/**
 * Query Editor Helper
 */
export class QueryEditorHelper {
  private readonly locator: Locator;
  private readonly grafanaPage: PanelEditPage | VariableEditPage;
  private readonly selectors: LocatorSelectors<typeof TEST_IDS.queryEditor>;
  private readonly grafanaSelectors: E2ESelectorGroups;

  constructor(page: Page, grafanaPage: PanelEditPage | VariableEditPage, grafanaSelectors: E2ESelectorGroups) {
    this.locator = page.locator('body');
    this.grafanaPage = grafanaPage;
    this.grafanaSelectors = grafanaSelectors;
    this.selectors = getLocatorSelectors(TEST_IDS.queryEditor)(this.locator);
  }

  private getMsg(msg: string): string {
    return `Query Editor: ${msg}`;
  }

  public get() {
    return this.locator;
  }

  public getSelectors() {
    return this.selectors;
  }

  public async checkRequestField() {
    return expect(this.selectors.fieldRequest(), this.getMsg('Check presence')).toBeVisible();
  }

  public async checkPresence() {
    return expect(this.selectors.root(), this.getMsg('Check presence')).toBeVisible();
  }

  public async changeRequestType(key: string) {
    await this.selectors.root().getByRole('combobox').click();
    await this.grafanaPage
      .getByGrafanaSelector(this.grafanaPage.ctx.selectors.components.Select.option)
      .getByText(key)
      .click();
  }
}
