import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import { useContext } from '../context';

const Header = () => {
  const {
    iconRef,
    screenPalette,
    showOptions: handleMorePress,
  } = useContext();

  return (
    <HeaderBar
      statusBarProps={{
        backgroundColor: screenPalette.header.background,
      }}
      rightIcons={[
        {
          id: 'more-vertical',
          iconRef,
          iconColor: screenPalette.header.text,
          backgroundColor: 'transparent',
          onPress: handleMorePress,
        },
      ]}
    >
      <Title color={screenPalette.header.text}>
        Pagamento
      </Title>
    </HeaderBar>
  )
};

export default Header;
