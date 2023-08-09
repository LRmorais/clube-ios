import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import Box from '../../components/box';
import PaddingContainer from '../../components/paddingContainer';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import Explanation from './parts/explanation';
import List from './parts/list';
import Numbers from './parts/numbers';
import Request from './parts/request';
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
          <PaddingContainer>
            <Explanation />
            <Spacer size={3} fixedSize setMinSize />
            <List />
          </PaddingContainer>
        </Box>
      </LayoutScreen>
      <Numbers />
      <Request />
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
