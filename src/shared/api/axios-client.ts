import axios from 'axios';
import { env } from '../../config/env';
import qs from 'qs';

const apiURL = env.API_URL;

export const api = axios.create({
  baseURL: apiURL,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      skipNulls: true,
    }),
});
