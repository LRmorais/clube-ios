import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';

import Header from './parts/header';
import SortAndFilters from './parts/sortAndFilters';
import Maps from './parts/maps';
import AbsoluteButtons from './parts/absoluteButtons';

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
        <SortAndFilters />
        <Maps />
      </LayoutScreen>
      <AbsoluteButtons />
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
