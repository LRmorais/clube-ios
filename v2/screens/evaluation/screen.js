import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import Box from '../../components/box';
import PaddingContainer from '../../components/paddingContainer';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import FirstQuestion from './parts/firstQuestion';
import OneToFive from './parts/oneToFive';
import SecondQuestion from './parts/secondQuestion';
import Tagging from './parts/tagging';
import PublicCommentField from './parts/publicCommentField';
import PrivateCommentField from './parts/privateCommentField';
import SubmitButton from './parts/submitButton';
import StepOut from './parts/stepOut';
import Loading from './parts/loading';
import NoInternet from './parts/noInternet';

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
        <Box shadow="bottom">
          <PaddingContainer>
            <FirstQuestion />
            <Spacer size={3} fixedSize />
            <OneToFive />
            <SecondQuestion />
            <Tagging />
          </PaddingContainer>
        </Box>
        <Box shadow="top">
          <PaddingContainer>
            <PublicCommentField />
            <Spacer size={3} fixedSize />
            <PrivateCommentField />
            <SubmitButton />
            <Spacer size={3} fixedSize />
            <StepOut />
          </PaddingContainer>
        </Box>
      </LayoutScreen>
      <Loading />
      <NoInternet />
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
