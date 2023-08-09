import React, { createContext, useContext as useReactContext, useState, useEffect } from 'react';

import database from '../../helpers/database';
import { useGlobalStateContext } from '../../hocs/globalState';
import { useOfflineDataContext } from '../../hocs/offlineData';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    generalData,
  } = useGlobalStateContext();
  const {
    API_MATRIX_KEY_IDENTIFIER,
    LAST_TIME_TASKS_EXECUTING,
    getMissingMatrix,
  } = useOfflineDataContext();
  const [lastTimeUpdatedData, setLastTimeUpdatedData] = useState(null);
  const [missingData, setMissingData] = useState(null);
  const [mismatchingData, setMismatchingData] = useState(null);
  const secretDataKey = {
    events: 'E',
    moments: 'M',
    partners: 'P',
    movies: 'F',
    scripts: 'R',
    challenges: 'D',
  };

  useEffect(() => {
    checkLastTimeUpdatedData();
    checkMissingData();
    checkMismatchingData();
  }, []);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  async function checkLastTimeUpdatedData() {
    let lastTime = await database.get(LAST_TIME_TASKS_EXECUTING);
    setLastTimeUpdatedData(Number(lastTime));
  }

  async function checkMissingData() {
    try {
      let matrix = await database.get(API_MATRIX_KEY_IDENTIFIER).then(JSON.parse);
      let missing = await getMissingMatrix(Object.entries(matrix));
      let serialized = missing
        .map(([key, values]) => values.map(({ id }) => secretDataKey[key] + id))
        .flat();
      setMissingData(serialized);
    } catch {
      //
    }
  }

  async function checkMismatchingData() {
    try {
      let matrix = await database.get(API_MATRIX_KEY_IDENTIFIER)
        .then(JSON.parse)
        .then(Object.entries);
      let mismatching = matrix.map(([key, values]) => {
        let dataKey = {
          events: 'eventsByID',
          moments: 'momentsByID',
          partners: 'partnersByID',
          movies: 'moviesByID',
          scripts: 'guidesByID',
          challenges: 'challengesByID',
        }[key];
        let data = generalData[dataKey];
        let mismatching = values
          .filter(({ id, currentVersion }) => {
            let item = data[id];
            return item && item.currentVersion !== currentVersion
          })
          .map(({ id, currentVersion }) => (
            `${secretDataKey[key]}${id}-${data[id].currentVersion}:${currentVersion}`
          ));
        return mismatching;
      }).flat();
      setMismatchingData(mismatching);
    } catch {
      //
    }
  }

  const value = {
    returnToPreviousScreen,
    lastTimeUpdatedData,
    missingData,
    mismatchingData,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
