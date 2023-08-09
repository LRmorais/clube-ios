import React, {createContext, useContext, useState, useEffect} from 'react';
import {AppState} from 'react-native';

import API from '../helpers/api';
import database from '../helpers/database';
import {useGlobalStateContext} from '../hocs/globalState';

const Context = createContext();
export const useOfflineDataContext = () => useContext(Context);

const DATA_MATRIX_KEY_IDENTIFIER = 'DATA_MATRIX_KEY';
const API_MATRIX_KEY_IDENTIFIER = 'API_MATRIX_KEY';
const LAST_TIME_TASKS_EXECUTING = 'LAST_TIME_TASKS_EXECUTING';
export const MAIN_DATA_KEY_IDENTIFIER = 'MAIN_DATA_KEY';

const OfflineDataProvider = props => {
  const {generalData, updateGeneralData} = useGlobalStateContext();
  const [negotiatingData, setNegotiatingData] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const [externalMethods, setExternalMethods] = useState({});
  const ANALYTICS__dispatchRecord = externalMethods.dispatchRecord;

  function addExternalMethods(methods) {
    setExternalMethods(externalMethods => ({
      ...externalMethods,
      ...methods,
    }));
  }

  function updateLocalMatrix(matrix) {
    return database.set(DATA_MATRIX_KEY_IDENTIFIER, JSON.stringify(matrix));
  }

  function updateLocalData(data) {
    return database.set(MAIN_DATA_KEY_IDENTIFIER, JSON.stringify(data));
  }

  function updateLastTimeTasksExecuting() {
    return database.set(LAST_TIME_TASKS_EXECUTING, String(Date.now()));
  }

  function getData(what) {
    const thing = {
      // event: 'events',
      // guide: 'scripts',
      // moment: 'moments',
      // movie: 'movies',
      partner: 'partner',
      // challenge: 'challenges',
    }[what];
    return function (array) {
      return Promise.all(
        array.map(async ({slug, currentVersion}) => {
          try {
            let result = await API.call({
              method: 'get',
              url: `/api/repository/${thing}/${slug}/${currentVersion}`,
              validateStatus: status => status === 200,
            });
            return result.data;
          } catch (e) {
            ANALYTICS__dispatchRecord('Catch__App', {
              functionName: 'getData',
              params: {what, slug, currentVersion},
              error: e.toString(),
            });
            return null;
          }
        }),
      );
    };
  }
  const [
    // getEvents,
    // getGuides,
    // getMoments,
    // getMovies,
    getPartners,
    // getChallenges,
  ] = ['partner'].map(
    // ] = ['event', 'guide', 'moment', 'movie', 'partner', 'challenge'].map(
    getData,
  );

  async function getCategories() {
    try {
      let userInfo = await database.get('user-info').then(JSON.parse);
      let userId = userInfo?.id;
      let result = await API.call({
        method: 'get',
        url: `/api/repository/categories/main/${userId}`,
      });
      await database.set('categories', JSON.stringify(result.data));
      return result.data;
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'getCategories',
        params: {},
        error: e.toString(),
      });
    }
  }

  async function getEvaluationTags() {
    try {
      let result = await API.call({
        method: 'get',
        url: 'api/repository/config',
      });
      let tags = result.data.app.clientGazetaValidationsTagsValidations;
      await database.set('evaluation-tags', JSON.stringify(tags));
      return tags;
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'getEvaluationTags',
        params: {},
        error: e.toString(),
      });
    }
  }

  async function getInitialPayload() {
    try {
      let result = await API.call({
        method: 'get',
        url: 'api/repository/completeJSON',
      });
      return {
        data: result.data,
        matrix: generateMatrix(result.data, 'natural'),
      };
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'getInitialPayload',
        params: {},
        error: e.toString(),
      });
    }
  }

  function generateMatrix(allData, kind) {
    try {
      let arr = Object.entries(allData).map(([key, data]) => [
        key,
        data.map(({id, slug, currentVersion}) => ({
          id,
          slug,
          currentVersion,
        })),
      ]);
      return Object.fromEntries(arr);
    } catch (e) {
      let allDataMini = Object.fromEntries(
        Object.entries(allData).map(([key, data]) => [
          key,
          Array.isArray(data) || data === null || typeof data,
        ]),
      );
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'generateMatrix',
        params: {allData: allDataMini, kind},
        error: e.toString(),
      });
      throw e;
    }
  }

  async function compareMatrix() {
    try {
      let initialPayload = await getInitialPayload();
      updateLocalData(initialPayload.data);
      updateLocalMatrix(initialPayload.matrix);
      return initialPayload.data;
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'compareMatrix',
        params: {},
        error: e.toString(),
      });
    }
  }

  async function executeTasks() {
    if (negotiatingData) {
      return;
    }

    try {
      setNegotiatingData(true);
      await updateGeneralData();
      let [mainData, categories, evaluationTags] = await Promise.race([
        Promise.all([compareMatrix(), getCategories(), getEvaluationTags()]),
        // new Promise((resolve, reject) => setTimeout(reject, 30 * 1000)),
      ]).catch(e => {
        console.log('deu ruim na parte da matriz', e);
      });
      if (!generalData || !mainData) {
        updateGeneralData({
          mainData,
          categories,
          evaluationTags,
        });
      }
      updateLastTimeTasksExecuting();
    } catch (e) {
      // this may be critical; maybe the app should have an error screen for this
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'executeTasks',
        params: {},
        error: e.toString(),
      });
    } finally {
      setNegotiatingData(false);
    }
  }

  async function runTasksIfNeeded(appState = 'active') {
    try {
      if (appState !== 'active') {
        return;
      }

      if (!generalData) {
        return executeTasks();
      }

      let lastTime = await database.get(LAST_TIME_TASKS_EXECUTING);
      if (!lastTime || Date.now() - Number(lastTime) < 1000 * 60 * 60 * 2) {
        return;
      }

      executeTasks();
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'runTasksIfNeeded',
        params: {appState},
        error: e.toString(),
      });
      throw e;
    }
  }

  useEffect(() => {
    if (!ANALYTICS__dispatchRecord) {
      return;
    }

    AppState.addEventListener('change', setAppState);
  }, [ANALYTICS__dispatchRecord]);

  useEffect(() => {
    if (!ANALYTICS__dispatchRecord) {
      return;
    }

    runTasksIfNeeded(appState);
  }, [appState, ANALYTICS__dispatchRecord]);

  const value = {
    DATA_MATRIX_KEY_IDENTIFIER,
    API_MATRIX_KEY_IDENTIFIER,
    LAST_TIME_TASKS_EXECUTING,
    MAIN_DATA_KEY_IDENTIFIER,
    negotiatingData,
    addExternalMethods,
    // getEvents,
    // getGuides,
    // getMoments,
    // getMovies,
    getPartners,
    // getChallenges,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default OfflineDataProvider;
