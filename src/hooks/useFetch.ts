import useSWR from 'swr';

import { weatherApi } from '../services/weatherApi';

export function useFetch<Data = any>(url: string) {
  const { data, error } = useSWR<Data>(url, async () => {
    const response = await weatherApi.get('');
    return response.data.results;
  });

  return { data, error };
}
