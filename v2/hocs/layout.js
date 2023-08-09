import React, {createContext, useContext, useState, useEffect} from 'react';
import {View} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

import database from '../helpers/database';
import API from '../helpers/api';
import {theme as globalTheme} from '../utils/style';
import {ASSET_PREFIX} from '../constants/env';
import defaultPalette from '../defaults/palette.json';
import defaultTheme from '../defaults/theme.json';

const Context = createContext();
export const useLayoutContext = () => useContext(Context);

const LayoutProvider = props => {
  const [statusBarHeight, setStatusBarHeight] = useState(null);
  const headerBarHeight = globalTheme.spacing(8);
  const [screenHeight, setScreenHeight] = useState(null);
  const [safeScreenHeight, setSafeScreenHeight] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);
  const [palette] = useState(defaultPalette);
  const [theme, setTheme] = useState(defaultTheme);
  const [whiteLabelId, setWhiteLabelId] = useState(0);
  const DATABASE_APP_THEME_KEY = 'APP_THEME';

  useEffect(() => {
    database.remove('APP_PALETTE');
    database.get(DATABASE_APP_THEME_KEY).then(theme => {
      if (theme) {
        setTheme(JSON.parse(theme));
      }
    });
  }, []);

  async function loadTheme(offerId) {
    if (!offerId) {
      return;
    }

    try {
      let result = await API.call({
        method: 'get',
        baseURL: ASSET_PREFIX,
        url: `api/repository/whilelabel/${offerId}.json`,
        headers: {
          'Cache-control': 'no-cache, no-store, must-revalidate',
        },
      });
      if (result.status !== 200) {
        return;
      }
      setTheme({
        ...defaultTheme,
        ...result.data,
      });

      if (result.data.id == null || undefined || '') {
        setWhiteLabelId(0);
      } else {
        setWhiteLabelId(result.data.id);
      }

      return database.set(
        DATABASE_APP_THEME_KEY,
        JSON.stringify({
          ...defaultTheme,
          ...result.data,
        }),
      );
    } catch {
      //
    }
  }

  function removeTheme() {
    database.remove(DATABASE_APP_THEME_KEY).then(() => setTheme(defaultTheme));
  }

  function handleLayout(e) {
    setStatusBarHeight(~~getStatusBarHeight());
    setScreenHeight(~~e.nativeEvent.layout.height);
    setSafeScreenHeight(~~(e.nativeEvent.layout.height - getStatusBarHeight()));
    setScreenWidth(~~e.nativeEvent.layout.width);
  }

  const value = {
    DATABASE_APP_THEME_KEY,
    statusBarHeight,
    headerBarHeight,
    screenHeight,
    safeScreenHeight,
    screenWidth,
    palette,
    theme,
    loadTheme,
    removeTheme,
    whiteLabelId,
  };

  return (
    <Context.Provider value={value}>
      <View style={{flex: 1}} onLayout={handleLayout}>
        {screenHeight !== null && props.children}
      </View>
    </Context.Provider>
  );
};

export default LayoutProvider;
