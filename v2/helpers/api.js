import axios from 'axios';

import database from './database';
import {createUUID} from '../utils/id';
import {insert, remove} from '../utils/array';
import {API_BASE_URL} from '../constants/env';

const AXIOS_SAVED_REQUESTS_STACK_KEY = 'AXIOS_REQUESTS_STACK';
const AXIOS_SAVED_REQUEST_KEY_IDENTIFIER = 'AXIOS_SAVED__';
const AXIOS_SAVED_REQUEST_KEY = () =>
  AXIOS_SAVED_REQUEST_KEY_IDENTIFIER + createUUID();

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  validateStatus: status => status < 500,
  timeout: 60000,
  withCredentials: true,
  maxRedirects: 0,
});

instance.interceptors.response.use(response => {
  if (response) {
    if (response.status >= 300 && response.status < 400) {
      if (response.headers.location) {
        return instance({
          method: response.config.method,
          baseURL: response.headers.location,
          url: '',
          headers: response.config.headers,
          data: response.config.data
            ? JSON.parse(response.config.data)
            : undefined,
        });
      }
    }
    if (response.status === 401) {
      let completeURL = (response.config.baseURL + response.config.url)
        .replace(/\/+/g, '/')
        .replace('/', '//');
      if (completeURL !== response.request.responseURL) {
        return instance({
          method: response.config.method,
          baseURL: response.request.responseURL,
          url: '',
          headers: response.config.headers,
          data: response.config.data
            ? JSON.parse(response.config.data)
            : undefined,
        });
      }
    }
  }
  return response;
});

function getSavedData(requestKey) {
  return {
    data: {
      savedToLater: true,
      requestKey,
    },
  };
}

async function getAllRequests() {
  let allRequests = await database.get(AXIOS_SAVED_REQUESTS_STACK_KEY);
  return JSON.parse(allRequests) || [];
}

async function saveRequest(requestParams) {
  let requestKey = AXIOS_SAVED_REQUEST_KEY();
  let allRequests = await getAllRequests();
  await database.set(
    AXIOS_SAVED_REQUESTS_STACK_KEY,
    JSON.stringify(insert(allRequests || [], requestKey)),
  );
  await database.set(requestKey, JSON.stringify(requestParams));
  return requestKey;
}

async function deleteRequest(requestKey) {
  let allRequests = await getAllRequests();
  await database.set(
    AXIOS_SAVED_REQUESTS_STACK_KEY,
    JSON.stringify(remove(allRequests || [], requestKey)),
  );
  await database.remove(requestKey);
  return true;
}

async function call(requestParams, saveToLaterIfNeeded = false) {
  if (!saveToLaterIfNeeded) {
    return instance(requestParams);
  }

  try {
    let response = await instance(requestParams);
    return response;
  } catch {
    let requestKey = await saveRequest(requestParams);
    return getSavedData(requestKey);
  }
}

async function retry(requestKey) {
  let requestParams = await database.get(requestKey);
  if (!requestParams) {
    return false;
  }

  try {
    let response = await instance(JSON.parse(requestParams));
    await deleteRequest(requestKey);
    return response;
  } catch {
    return getSavedData(requestKey);
  }
}

async function executeStack() {
  let allRequests = await getAllRequests();
  if (allRequests.length === 0) {
    return true;
  }

  for (let requestKey of allRequests) {
    let params = await database.get(requestKey);
    if (params) {
      try {
        await instance(JSON.parse(params));
        deleteRequest(requestKey);
      } catch {
        //
      }
    } else {
      deleteRequest(requestKey);
    }
  }
}

export default {
  call,
  retry,
  executeStack,
};
