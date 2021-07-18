import axios from 'axios';

export const dollarToReal = axios.create({
  baseURL: `https://free.currconv.com/api/v7/convert?q=USD_BRL&compact=ultra&apiKey=${process.env.DOLLAR_API_KEY}`,
});

dollarToReal.interceptors.request.use((config) => {
  console.log(config);

  return config;
});
