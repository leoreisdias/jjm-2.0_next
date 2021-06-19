import useSWR from 'swr';

import { api } from '../services/api';
import { weatherApi } from '../services/weatherApi';

export function useFetch<Data = any>(url: string) {
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

export function useJJM<Data = any>(url: string) {
  const { data, error } = useSWR<Data>(
    url,
    async () => {
      const response = await api.get(url);
      return response.data;
    },
    { revalidateOnFocus: true }
  );

  return { data, error };
}
