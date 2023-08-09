import React from 'react';
import {View} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';

import Header from './parts/header';
import List from './parts/list';
import Skeleton from './parts/skeleton';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {useContext} from './context';

const Screen = () => {
  const {theme} = useLayoutContext();
  const {units} = useContext();
  return (
    <>
      {units ? (
        <View
          style={[
            styles.container,
            {backgroundColor: theme.greyishBackground},
          ]}>
          <Header />
          <LayoutScreen>
            <List />
          </LayoutScreen>
        </View>
      ) : (
        <>
          <Header />
          <Skeleton />
        </>
      )}
    </>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
