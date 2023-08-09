import React from 'react';
import {View} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import List from './parts/list';
import Skeleton from './parts/skeleton';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

import {useContext} from './context';

const Screen = () => {
  const {theme} = useLayoutContext();
  const {movies} = useContext();

  return (
    <View style={[styles.container, {backgroundColor: theme.whiteBackground}]}>
      <Header />
      <LayoutScreen>
        {movies.length !== 0 ? <List /> : <Skeleton />}

        <Spacer size={3} fixedSize />
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
