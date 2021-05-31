import axios from 'axios';

const dollarToReal = axios.create({
  baseURL: `https://free.currconv.com/api/v7/convert?q=USD_BRL&compact=ultra&apiKey=${process.env.dollarApiKey}`,
});

export default dollarToReal;
