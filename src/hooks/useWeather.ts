/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr';

import { weatherApi } from '../services/weatherApi';

export function useWeather<Data = any>(url: string) {
  const { data, error } = useSWR<Data>(
    url,
    async () => {
      const response = await weatherApi.get('');
      return response.data.results;
    },
    { revalidateOnMount: true }
  );

  return { data, error };
}
