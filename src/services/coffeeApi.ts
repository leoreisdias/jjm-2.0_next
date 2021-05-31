import axios from 'axios';

const coffeeApi = axios.create({
  baseURL: `https://www.quandl.com/api/v3/datasets/CEPEA/COFFEE_A.json?api_key=${process.env.coffeeApiKey}`,
});

export default coffeeApi;
