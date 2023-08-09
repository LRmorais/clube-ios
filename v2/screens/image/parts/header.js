import React from 'react';
import { View } from 'react-native';

import HeaderBar from '../../../components/headerBar';
import createStyle from '../../../utils/style';
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
    <View style={styles.container}>
      <HeaderBar
        backgroundColor="transparent"
        cornerShadow
        statusBarProps={{
          hidden: true,
        }}
        leftIcons={[
          {
            id: 'return-arrow',
            backgroundColor: 'transparent',
            iconColor: theme.contrastTextColor,
            onPress: handleBackPress,
          },
        ]}
      />
    </View>
  );
};

const styles = createStyle({
  container: {
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
});

export default Header;
