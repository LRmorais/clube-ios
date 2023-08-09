import API from './api';
import { GRAPHQL_URL } from '../constants/env';

export default ({ query, variables, headers }) => API.call({
  method: 'post',
  baseURL: GRAPHQL_URL,
  url: '',
  headers,
  data: {
    query,
    variables,
  },
});
