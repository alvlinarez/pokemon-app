import axios, { type AxiosInstance } from 'axios';
import { API_URL } from '../constants';

// interface BuildHttpClientProps {
//   userName: string;
//   token: string;
// }

export function buildHttpClient(): AxiosInstance {
  const httpClient = axios.create();
  httpClient.defaults.baseURL = API_URL;
  httpClient.defaults.headers.common['Accept'] = 'application/json';
  // httpClient.defaults.headers.common['Authorization'] = `Basic ${toBase64(`${userName}:${token}`)}`;

  return httpClient;
}

// function toBase64(value: string) {
//   return Buffer.from(value).toString('base64');
// }
