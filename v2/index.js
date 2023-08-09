import React from 'react';
import { LogBox, Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';

import HOCs from './hocs';
import Routes from './routes';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
]);

if (Platform.OS === 'android') enableScreens();

if (typeof Array.prototype.flat !== 'function') Array.prototype.flat = function(depth = 1) {
  console.warn('Running `Array.prototype.flat` function as polyfill.');
  return [...new Array(depth)].reduce((arr) => Array.prototype.concat(...(Array.isArray(arr) ? arr : [arr])), this);
}

if (typeof Object.fromEntries !== 'function') Object.fromEntries = function(arr) {
  console.warn('Running `Object.fromEntries` function as polyfill.');
  return arr.reduce((cumulative, [key, value]) => ({
    ...cumulative,
    [key]: value,
  }), {});
}

const NewApp = () => (
  <HOCs>
    <Routes />
  </HOCs>
);

export default NewApp;
