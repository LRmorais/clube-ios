import React from 'react';

import HeaderBar from '../../../components/headerBar';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Header = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    returnToPreviousScreen: handleBackPress,
  } = useContext();

  return (
    <HeaderBar
      backgroundColor={theme.primaryColor}
      leftIcons={[
        {
          id: 'return-arrow',
          iconColor: theme.contrastTextColor,
          backgroundColor: 'transparent',
          onPress: handleBackPress,
        },
      ]}
    />
  );
};

export default Header;
