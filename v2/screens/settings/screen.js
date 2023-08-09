import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import Box from '../../components/box';

import Header from './parts/header';
import FirstSwitchGroup from './parts/firstSwitchGroup';
import SecondSwitchGroup from './parts/secondSwitchGroup';
import FirstLinkGroup from './parts/firstLinkGroup';

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
        <Box
          shadow="bottom"
          noGutters
        >
          <FirstSwitchGroup />
        </Box>
        <Box
          shadow="both"
          noGutters
        >
          <SecondSwitchGroup />
        </Box>
        <Box
          shadow="both"
          noGutters
        >
          <FirstLinkGroup />
        </Box>
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
