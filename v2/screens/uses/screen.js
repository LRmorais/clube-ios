import React from 'react';
import {View} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';

import Header from './parts/header';
import TypeTabs from './parts/typeTabs';
import List from './parts/list';
import NoResults from './parts/noResults';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const Screen = () => {
  const {theme} = useLayoutContext();

  return (
    <View style={[styles.container, {backgroundColor: theme.whiteBackground}]}>
      <Header />
      <TypeTabs />
      <LayoutScreen>
        <NoResults />
        <List />
      </LayoutScreen>
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
