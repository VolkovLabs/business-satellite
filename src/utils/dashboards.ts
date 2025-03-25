import { getBackendSrv } from '@grafana/runtime';
import { lastValueFrom } from 'rxjs';
import { DashboardTagItem } from 'types';

/**
 * Get Dashboards Tags
 */
export const getAllDashboardsTags = async (url?: string): Promise<DashboardTagItem[]> => {
  if (!url) {
    return [];
  }

  /**
   * Fetch
   */
  const response = await lastValueFrom(
    getBackendSrv().fetch<DashboardTagItem[]>({
      method: 'GET',
      url: `${url}/api/dashboards/tags`,
    })
  );

  if (response && response.data) {
    return response.data;
  }

  return [];
};
