import { getBackendSrv } from '@grafana/runtime';
import { lastValueFrom } from 'rxjs';

import { getAllAnnotationsTags } from './annotations';

/**
 * Mock runtime
 */
jest.mock('@grafana/runtime', () => ({
  getBackendSrv: jest.fn(),
}));

/**
 * rxjs
 */
jest.mock('rxjs', () => ({
  lastValueFrom: jest.fn(),
}));

describe('getAllAnnotationsTags', () => {
  /**
   * Url
   */
  const url = 'http://localhost';

  /**
   * Tags
   */
  const mockTags = [
    { tag: 'New', count: 1 },
    { tag: 'Old', count: 2 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return an empty array if no URL is provided', async () => {
    const result = await getAllAnnotationsTags();
    expect(result).toEqual([]);
  });

  it('Should fetch and return annotation tags', async () => {
    jest.mocked(getBackendSrv).mockReturnValue({
      fetch: jest.fn(() => ({
        toPromise: jest.fn(() => Promise.resolve({ data: { result: { tags: mockTags } } })),
      })),
    } as any);

    jest.mocked(lastValueFrom).mockResolvedValue({ data: { result: { tags: mockTags } } });

    const result = await getAllAnnotationsTags(url);

    expect(getBackendSrv).toHaveBeenCalled();
    expect(lastValueFrom).toHaveBeenCalled();
    expect(result).toEqual(mockTags);
  });

  it('Should return an empty array if response is undefined', async () => {
    jest.mocked(getBackendSrv).mockReturnValue({
      fetch: jest.fn(() => ({
        toPromise: jest.fn(() => Promise.resolve({ data: undefined })),
      })),
    } as any);

    jest.mocked(lastValueFrom).mockResolvedValue({ data: undefined });

    const result = await getAllAnnotationsTags(url);

    expect(getBackendSrv).toHaveBeenCalled();
    expect(lastValueFrom).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('Should return an empty array if result in response is undefined', async () => {
    jest.mocked(getBackendSrv).mockReturnValue({
      fetch: jest.fn(() => ({
        toPromise: jest.fn(() => Promise.resolve({ data: { result: undefined } })),
      })),
    } as any);

    jest.mocked(lastValueFrom).mockResolvedValue({ data: { result: undefined } });

    const result = await getAllAnnotationsTags(url);

    expect(getBackendSrv).toHaveBeenCalled();
    expect(lastValueFrom).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
