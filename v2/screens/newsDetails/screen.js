import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen'

import Header from './parts/header';
import Content from './parts/content';

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
        <Content />
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
