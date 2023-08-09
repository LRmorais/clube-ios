import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import Box from '../../components/box';
import PaddingContainer from '../../components/paddingContainer';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import Head from './parts/head';
import Partner from './parts/partner';
import Contact from './parts/contact';
import Info from './parts/info';
import AbsoluteButton from './parts/absoluteButton';
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
      { backgroundColor: theme.greyishBackground },
    ]}>
      <Header />
      <LayoutScreen>
        <Head />
        <Box shadow="bottom">
          <PaddingContainer>
            <Partner />
            <Contact />
          </PaddingContainer>
        </Box>
        <Box shadow="both">
          <Info />
        </Box>
        <Spacer size={11} fixedSize />
      </LayoutScreen>
      <AbsoluteButton />
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
