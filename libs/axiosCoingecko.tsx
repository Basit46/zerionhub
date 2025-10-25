import axios from "axios";

const axiosCoingeckoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "Content-Type": "application/json",
    "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
  },
});

export default axiosCoingeckoApi;
