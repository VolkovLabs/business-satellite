import { getBackendSrv } from '@grafana/runtime';
import { lastValueFrom } from 'rxjs';

import { AnnotationTagItem } from '../types';

export interface AnnotationsResult {
  result: {
    tags: AnnotationTagItem[];
  };
}
/**
 * Get Annotations Tags
 */
export const getAllAnnotationsTags = async (url?: string): Promise<AnnotationTagItem[]> => {
  /**
   * No url
   */
  if (!url) {
    return [];
  }

  /**
   * Fetch
   */
  const response = await lastValueFrom(
    getBackendSrv().fetch<AnnotationsResult>({
      method: 'GET',
      url: `${url}/api/annotations/tags`,
    })
  );

  /**
   * Return response
   */
  if (response && response.data?.result && response.data?.result?.tags) {
    return response.data.result.tags;
  }

  return [];
};
