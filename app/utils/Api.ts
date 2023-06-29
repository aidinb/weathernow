import axios, {AxiosInstance} from 'axios';

const apiConfig: AxiosInstance = axios.create({
  baseURL: 'https://us-central1-mobile-assignment-server.cloudfunctions.net',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const API = apiConfig;
