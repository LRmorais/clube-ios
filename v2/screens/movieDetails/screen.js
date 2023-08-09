import React from 'react';
import {View, SafeAreaView} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';

import Header from './parts/header';
import {Head} from './parts/head';
import Skeleton from './parts/skeleton';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {TabListDays} from './parts/tabListDays';
import {useContext} from './context';

const Screen = () => {
  const {loading} = useContext();
  const {theme} = useLayoutContext();

  return (
    <View style={[styles.container, {backgroundColor: theme.whiteBackground}]}>
      {!loading ? (
        <>
          <Header />
          <LayoutScreen>
            <Head />
            <TabListDays />
          </LayoutScreen>
        </>
      ) : (
        <SafeAreaView>
          <Skeleton />
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
