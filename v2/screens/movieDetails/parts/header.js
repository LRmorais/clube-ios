import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Header = () => {
  const {theme} = useLayoutContext();
  const {
    iconRef,
    movieById: movie,
    returnToPreviousScreen: handleBackPress,
    showOptions: handleMorePress,
  } = useContext();

  return (
    <HeaderBar
      backgroundColor={theme.whiteBackground}
      leftIcons={[
        {
          id: 'return-arrow',
          backgroundColor: 'transparent',
          iconColor: theme.primaryColor,
          onPress: handleBackPress,
        },
      ]}
      rightIcons={[
        {
          id: 'more-vertical',
          iconRef,
          backgroundColor: 'transparent',
          iconColor: theme.primaryColor,
          onPress: handleMorePress,
        },
      ]}>
      <Title color={theme.primaryColor}>
        {movie?.title ? movie?.title : 'Carregando ...'}
      </Title>
    </HeaderBar>
  );
};

export default Header;
