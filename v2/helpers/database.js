import AsyncStorage from '@react-native-async-storage/async-storage';

import { breakIntoChunks } from '../utils/string';

const ASYNC_STORAGE_VALUE_MAX_LENGTH = 150000;
const ASYNC_STORAGE_SERIALIZED_KEY_IDENTIFIER = '__NUM_OF_CHUNKS';
const ASYNC_STORAGE_SERIALIZED_CHUNK_KEY = (key, index) => String(key + '___' + index);

async function get(key) {
  let value = await AsyncStorage.getItem(key);
  if (!value) return null;
  try {
    let parsedValue = JSON.parse(value);
    if (parsedValue && parsedValue[ASYNC_STORAGE_SERIALIZED_KEY_IDENTIFIER]) {
      let keys = [...new Array(parsedValue[ASYNC_STORAGE_SERIALIZED_KEY_IDENTIFIER])].map(
        (_, index) => ASYNC_STORAGE_SERIALIZED_CHUNK_KEY(key, index)
      );
      let values = await AsyncStorage.multiGet(keys);
      return values.map(([, value]) => value).join('');
    } else {
      return value;
    }
  } catch {
    return value;
  }
}

async function set(key, value) {
  try {
    if (value.length <= ASYNC_STORAGE_VALUE_MAX_LENGTH) {
      await AsyncStorage.setItem(key, value);
      return true;
    }
    let chunks = breakIntoChunks(value, ASYNC_STORAGE_VALUE_MAX_LENGTH);
    await AsyncStorage.multiSet([
      ...chunks.map((chunk, index) => ([
        ASYNC_STORAGE_SERIALIZED_CHUNK_KEY(key, index),
        chunk,
      ])),
      [key, JSON.stringify({ [ASYNC_STORAGE_SERIALIZED_KEY_IDENTIFIER]: chunks.length })],
    ]);
    return true;
  } catch {
    return;
  }
}

async function remove(key) {
  let value = await AsyncStorage.getItem(key);
  if (!value) return true;
  try {
    let parsedValue = JSON.parse(value);
    if (parsedValue && parsedValue[ASYNC_STORAGE_SERIALIZED_KEY_IDENTIFIER]) {
      await AsyncStorage.multiRemove([...new Array(parsedValue[ASYNC_STORAGE_SERIALIZED_KEY_IDENTIFIER])].map(
        (_, index) => ASYNC_STORAGE_SERIALIZED_CHUNK_KEY(key, index)
      ));
      return true;
    }
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    return;
  }
}

async function clear() {
  try {
    await AsyncStorage.clear();
    return true;
  } catch {
    return;
  }
}

function keys() {
  return AsyncStorage.getAllKeys();
}

export default {
  get,
  set,
  remove,
  clear,
  keys,
};
