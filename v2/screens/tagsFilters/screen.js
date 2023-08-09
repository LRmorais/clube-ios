import React from 'react';
import {View} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import SearchBox from './parts/searchBox';
import Filters from './parts/filters';
import ApplyButton from './parts/applyButton';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const Screen = () => {
  const {theme} = useLayoutContext();

  return (
    <View style={[styles.container, {backgroundColor: theme.whiteBackground}]}>
      <Header />
      <LayoutScreen>
        <SearchBox />
        <Filters />
        <Spacer size={11} fixedSize />
      </LayoutScreen>
      <ApplyButton />
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
