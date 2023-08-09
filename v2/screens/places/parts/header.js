import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Header = () => {
  const {theme} = useLayoutContext();
  const {
    iconRef,
    haederPropsByViewMode: propsByViewMode,
    returnToPreviousScreen: handleBackPress,
    showOptions: handleMorePress,
    title,
  } = useContext();

  return (
    <HeaderBar
      backgroundColor="#ffff"
      iconColor={theme.primaryColor}
      leftIcons={[
        {
          id: 'return-arrow',
          iconColor: theme.primaryColor,
          backgroundColor: 'transparent',
          onPress: handleBackPress,
        },
      ]}
      rightIcons={[
        {
          ...propsByViewMode.rightIcon,
          iconColor: theme.primaryColor,
          backgroundColor: 'transparent',
        },
        {
          id: 'more-vertical',
          iconRef,
          iconColor: theme.primaryColor,
          backgroundColor: 'transparent',
          onPress: handleMorePress,
        },
      ]}>
      {/* <Title color={theme.primaryColor}>{propsByScreenType.title}</Title> */}
      <Title color={theme.primaryColor}>{title}</Title>
    </HeaderBar>
  );
};

export default Header;
