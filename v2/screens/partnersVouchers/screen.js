import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';

import Header from './parts/header';
import Filters from './parts/filters';
import List from './parts/list';
import NoResults from './parts/noResults';
import ErrorMessage from './parts/errorMessage';
import InfoModal from './parts/infoModal';

import createStyle from '../../utils/style';
import { useLayoutContext } from '../../hocs/layout';

const Screen = () => {
  const {
    theme,
  } = useLayoutContext();

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.greyishBackground },
    ]}>
      <Header />
      <LayoutScreen>
        <Filters />
        <List />
        <NoResults />
        <ErrorMessage />
      </LayoutScreen>
      <InfoModal />
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
