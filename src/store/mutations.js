import { camelizeKeys } from 'humps';

export const addStock = (state, payload) => {
  state.stocks.push({
    ticker: payload.ticker,
    active: true,
  });
  state.prices[payload.ticker] = {
    fetching: false,
    data: {},
  };
};

export const fetchPricesRequest = (state, payload) => {
  state.prices = {
    ...state.prices,
    [payload.ticker]: { fetching: true },
  };
};

export const fetchPricesSuccess = (state, payload) => {
  state.prices = {
    ...state.prices,
    [payload.ticker]: {
      data: camelizeKeys(payload.data),
      fetching: false
    },
  };
}
