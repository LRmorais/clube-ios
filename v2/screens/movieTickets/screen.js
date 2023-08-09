import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import Box from '../../components/box';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import List from './parts/list';
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
        <Box>
          <List />
        </Box>
      </LayoutScreen>
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
