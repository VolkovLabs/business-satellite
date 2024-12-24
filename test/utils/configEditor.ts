import { Locator, Page } from '@playwright/test';
import { DataSourceConfigPage, E2ESelectorGroups, expect } from '@grafana/plugin-e2e';
import { getLocatorSelectors, LocatorSelectors } from './selectors';
import { TEST_IDS } from '../../src/constants/tests';
import { RequestMode } from '../../src/types';

/**
 * Config Editor Helper
 */
export class ConfigEditorHelper {
  private readonly locator: Locator;
  private readonly selectors: LocatorSelectors<typeof TEST_IDS.configEditor>;
  private readonly configPage: DataSourceConfigPage;
  private readonly grafanaSelectors: E2ESelectorGroups;
  private readonly page: Page;

  constructor(page: Page, configPage: DataSourceConfigPage, selectors: E2ESelectorGroups) {
    this.locator = page.locator('body');
    this.configPage = configPage;
    this.page = page;
    this.grafanaSelectors = selectors;
    this.selectors = getLocatorSelectors(TEST_IDS.configEditor)(this.locator);
  }

  private getMsg(msg: string): string {
    return `Config Editor: ${msg}`;
  }

  public get() {
    return this.locator;
  }

  public checkPresence() {
    return expect(this.selectors.root(), this.getMsg(`Check root Config editor`)).toBeVisible();
  }

  public async checkPresenceURLField() {
    return expect(this.selectors.fieldUrl(), this.getMsg(`Check URL field presence`)).toBeVisible();
  }

  public async checkPresenceTokenField() {
    return expect(this.selectors.fieldToken(), this.getMsg(`Check Token field presence`)).toBeVisible();
  }

  public async checkPresenceRequestModeOptions() {
    return expect(this.selectors.fieldRequestMode(), this.getMsg(`Check Request Mode presence`)).toBeVisible();
  }

  public async setPath(path: string) {
    return await this.selectors.fieldUrl().fill(path);
  }

  public async setMode(option: RequestMode) {
    const modeOption = this.selectors.fieldRequestModelOption(option);
    return await modeOption.click();
  }

  public async checkSaveSuccess() {
    const buttonSave = this.configPage.getByGrafanaSelector(this.grafanaSelectors.pages.DataSource.saveAndTest);
    const alert = this.configPage.getByGrafanaSelector(this.grafanaSelectors.components.Alert.alertV2('success'));
    await expect(buttonSave).toBeVisible();
    await buttonSave.click();
    await this.page.waitForTimeout(3000);
    await expect(alert).toBeVisible();
  }

  public async checkSaveFail() {
    const buttonSave = this.configPage.getByGrafanaSelector(this.grafanaSelectors.pages.DataSource.saveAndTest);
    const alert = this.configPage.getByGrafanaSelector(this.grafanaSelectors.components.Alert.alertV2('error'));
    await expect(buttonSave).toBeVisible();
    await buttonSave.click();
    await this.page.waitForTimeout(3000);
    await expect(alert).toBeVisible();
  }
}
