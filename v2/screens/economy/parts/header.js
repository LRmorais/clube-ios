import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';

import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Header = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    returnToPreviousScreen: handleClosePress,
  } = useContext();

  return (
    <HeaderBar
      showShadow
      backgroundColor={theme.green__main}
      rightIcons={[
        {
          id: 'close',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: handleClosePress,
        },
      ]}
    >
      <Title color={theme.contrastTextColor}>
        Você já economizou
      </Title>
    </HeaderBar>
  );
};

export default Header;
