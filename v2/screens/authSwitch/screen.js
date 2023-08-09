import React from 'react';
import { ImageBackground } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import PaddingContainer from '../../components/paddingContainer';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import Logo from './parts/logo';
import Title from './parts/title';
import Paragraph from './parts/paragraph';
import GoToSignInButton from './parts/goToSignInButton';
import GoToSignUpButton from './parts/goToSignUpButton';

import createStyle from '../../utils/style';
import { useContext } from './context';

const Screen = () => {
  const {
    screenPalette,
  } = useContext();

  return (
    <ImageBackground
      style={[
        styles.imageBackground,
        { backgroundColor: screenPalette.screen.background },
      ]}
      source={require('../../images/textures/TexturaCurves.png')}
      resizeMode="cover"
    >
      <Header />
      <LayoutScreen>
        <PaddingContainer style={styles.content}>
          <Spacer size={9} />
          <Logo />
          <Spacer size={5} />
          <Title />
          <Spacer size={1.5} />
          <Paragraph />
          <Spacer size={11} />
          <GoToSignInButton />
          <Spacer size={2.5} />
          <GoToSignUpButton />
          <Spacer size={3.5} />
        </PaddingContainer>
      </LayoutScreen>
    </ImageBackground>
  );
};

const styles = createStyle({
  imageBackground: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default Screen;
