import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import { useContext } from '../context';

const Header = () => {
  const {
    screenPalette,
    returnToPreviousScreen: handleBackPress,
  } = useContext();

  return (
    <HeaderBar
      statusBarProps={{
        backgroundColor: screenPalette.header.background,
      }}
      leftIcons={[
        {
          id: 'return-arrow',
          backgroundColor: 'transparent',
          iconColor: screenPalette.header.text,
          onPress: handleBackPress,
        },
      ]}
    >
      <Title color={screenPalette.header.text}>
        Complete seu cadastro
      </Title>
    </HeaderBar>
  );
};

export default Header;
