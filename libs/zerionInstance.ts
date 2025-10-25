import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_THIRD_WEB_ZERION_API_KEY as string;

const zerionInstance = axios.create({
  baseURL: "https://api.zerion.io/v1",
  headers: {
    Accept: "application/json",
    Authorization: `Basic ${API_KEY}`,
  },
});

export default zerionInstance;
