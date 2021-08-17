/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr';

import { api } from '../services/api';
export function useJJM<Data = any>(url: string) {
  const { data, error } = useSWR<Data>(
    url,
    async () => {
      const response = await api.get(url);
      return response.data;
    },
    {
      errorRetryInterval: 10000,
      refreshInterval: 60000 * 5, // 5 minutes
    }
  );

  return { data, error };
}
