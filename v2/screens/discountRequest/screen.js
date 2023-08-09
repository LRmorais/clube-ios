import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';

import Header from './parts/header';
import MethodTab from './parts/methodTab';
import QRCode from './parts/qrCode';
import Card from './parts/card';
import Loading from './parts/loading';
import Feedback from './parts/feedback';

import createStyle from '../../utils/style';
import { useLayoutContext } from '../../hocs/layout';

const Screen = () => {
  const {
    theme,
  } = useLayoutContext();

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.whiteBackground },
    ]}>
      <Header />
      <LayoutScreen>
        <MethodTab />
        <QRCode />
        <Card />
      </LayoutScreen>
      <Loading />
      <Feedback />
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
