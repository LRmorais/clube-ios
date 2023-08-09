import API from './api';
import { EMPRESAS_URL } from '../constants/env';

export default ({ query, variables, headers }) => API.call({
  method: 'post',
  baseURL: EMPRESAS_URL,
  url: '',
  headers,
  data: {
    query,
    variables,
  },
});
