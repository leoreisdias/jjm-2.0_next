import axios from 'axios';
import { load } from 'cheerio';

export interface ICoffeePrice {
  hasData: boolean;
  closingDate: string;
  city: string;
  value: string;
  variation: string;
}

const vgmUrl =
  'https://www.noticiasagricolas.com.br/cotacoes/cafe/cafe-arabica-mercado-fisico-tipo-6-duro';

export async function getCoffeePrice(): Promise<ICoffeePrice> {
  try {
    const response = await axios(vgmUrl);
    const $ = load(response.data);

    const latestClosingTable = $('.tables')
      .first()
      .find('tbody tr')
      .first()
      .find('td')
      .contents()
      .map(function () {
        return this.type === 'text' ? $(this).text() + '#' : '';
      })
      .get()
      .join('');

    const latestClosingDate = $('.fechamento').first().text();

    const latestClosingPrice = latestClosingTable.split('#');

    if (latestClosingPrice) {
      const response = {
        hasData: true,
        closingDate: latestClosingDate,
        city: latestClosingPrice[0],
        value: `R$ ${latestClosingPrice[1]}`,
        variation: `${latestClosingPrice[2]}%`,
      };

      return response;
    } else {
      return {
        hasData: false,
        closingDate: '',
        city: '',
        value: '',
        variation: '',
      };
    }
  } catch (error) {
    return {
      hasData: false,
      closingDate: '',
      city: '',
      value: '',
      variation: '',
    };
  }
}
