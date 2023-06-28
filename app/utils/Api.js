import axios from 'axios';

axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

export const API = axios.create({
  baseURL: 'https://us-central1-mobile-assignment-server.cloudfunctions.net',
});
