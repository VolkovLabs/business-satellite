import { getBackendSrv } from '@grafana/runtime';
import { lastValueFrom } from 'rxjs';

import { getAllDashboardsTags } from './dashboards';

jest.mock('@grafana/runtime', () => ({
  getBackendSrv: jest.fn(),
}));

jest.mock('rxjs', () => ({
  lastValueFrom: jest.fn(),
}));

describe('getAllDashboardsTags', () => {
  const url = 'http://example.com';
  const mockTags = [{ term: 'test', count: 5 }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return an empty array if no URL is provided', async () => {
    const result = await getAllDashboardsTags();
    expect(result).toEqual([]);
  });

  it('Should fetch and return dashboard tags', async () => {
    jest.mocked(getBackendSrv).mockReturnValue({
      fetch: jest.fn(() => ({
        toPromise: jest.fn(() => Promise.resolve({ data: mockTags })),
      })),
    } as any);

    jest.mocked(lastValueFrom).mockResolvedValue({ data: mockTags });

    const result = await getAllDashboardsTags(url);

    expect(getBackendSrv).toHaveBeenCalled();
    expect(lastValueFrom).toHaveBeenCalled();
    expect(result).toEqual(mockTags);
  });

  it('Should fetch and return dashboard tags', async () => {
    jest.mocked(getBackendSrv).mockReturnValue({
      fetch: jest.fn(() => ({
        toPromise: jest.fn(() => Promise.resolve({ data: undefined })),
      })),
    } as any);

    jest.mocked(lastValueFrom).mockResolvedValue({ data: undefined });

    const result = await getAllDashboardsTags(url);

    expect(getBackendSrv).toHaveBeenCalled();
    expect(lastValueFrom).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
