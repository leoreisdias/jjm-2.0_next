import useSWR from 'swr';

import { dollarToReal } from '../services/dollarApi';

export function useDollar<Data = any>(url: string) {
  const { data, error } = useSWR<Data>(
    url,
    async () => {
      const response = await dollarToReal.get('');
      console.log(response);

      return response.data.USD_BRL;
    },
    { revalidateOnMount: true }
  );

  return { data, error };
}
