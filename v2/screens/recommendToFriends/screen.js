import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';

import Header from './parts/header';
import Carousel from './parts/carousel';
import ShareBar from './parts/shareBar';

import createStyle from '../../utils/style';

const Screen = () => (
  <View style={styles.container}>
    <Header />
    <LayoutScreen>
      <Carousel />
      <ShareBar />
    </LayoutScreen>
  </View>
);

const styles = createStyle({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default Screen;
