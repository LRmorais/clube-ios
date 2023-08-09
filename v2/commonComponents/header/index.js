import React from 'react';
import { useNavigation } from 'react-navigation-hooks';

import HeaderBar from '../../components/headerBar';
import ImageWithLoading from '../../components/imageWithLoading';
import createStyle from '../../utils/style';
import { useLayoutContext } from '../../hocs/layout';
import { useGlobalStateContext } from '../../hocs/globalState';

const Header = () => {
  const navigation = useNavigation();
  const {
    theme,
  } = useLayoutContext();
  const {
    setSideMenuVisible,
  } = useGlobalStateContext();

  // function handleVIPPress() {
  //   navigation.navigate('VIP');
  // }

  function handleSearchPress() {
    navigation.navigate('Search');
  }

  function handleMenuPress() {
    setSideMenuVisible(true);
  }

  return (
    <HeaderBar
      backgroundColor={theme.primaryColor}
      showShadow
      leftIcons={[
        {
          id: 'menu',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: handleMenuPress,
        },
      ]}
      rightIcons={[
        // {
        //   id: 'star-outlined',
        //   backgroundColor: theme.VIPBackground,
        //   iconColor: theme.primaryColor,
        //   onPress: handleVIPPress,
        // },
        {
          id: 'search',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: handleSearchPress,
        },
      ]}
    >
      {!theme?.id && (
        <ImageWithLoading
          containerStyle={styles.logo}
          source={require('../../images/logo/lying.png')}
        />
      )}
    </HeaderBar>
  );
};

const styles = createStyle({
  logo: {
    alignSelf: 'center',
    width: 86,
    height: 40,
  },
});

export default Header;
