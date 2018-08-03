export const addStock = ({ commit }, ticker) => {
  console.log(`Adding: ${ticker}`)
  commit('addStock', { ticker });
}

const FETCH_PRICES_REQUEST = 'fetchPricesRequest';
const FETCH_PRICES_SUCCESS = 'fetchPricesSuccess';
const FETCH_PRICES_FAILURE = 'fetchPricesFailure';

export const fetchPrices = async ({ commit }, ticker) => {
  let response, data;
  const key= "***REMOVED***";
  const url =
    `http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=${key}`

  commit(FETCH_PRICES_REQUEST, { ticker })

  try {
    response = await fetch(url);
    data = await response.json();
  }
  catch (e) {
    console.error(e);
  }

  console.log(data);

  commit(FETCH_PRICES_SUCCESS, {
    ticker,
    data,
  })
};

