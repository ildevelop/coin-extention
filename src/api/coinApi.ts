import axios from "axios";

const URL: string = "https://www.bitstamp.net/api/v2/";

const getCoin = async (coinPair: string): Promise<any> => {
  //btcusd
  const coin = await axios.get(`${URL}/ticker/${coinPair}`);
  return coin.data;
};

const API = {
  getCoin,
};
export default API;
