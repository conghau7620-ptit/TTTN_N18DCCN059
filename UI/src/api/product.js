import axios from './axios';
import { BASE_URL, ENDPOINT } from '../common/api';

export const getAllProducts = async () => {
  const res = await axios.get(`${BASE_URL}/product`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
  });
  return res;
};
