import React from 'react';
import {View} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import Header from './parts/header';
import PermissionsCarousel from './parts/permissionsCarousel';

import createStyle, {theme} from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const Screen = () => {
  const {theme} = useLayoutContext();

  return (
    <View style={styles.container}>
      <Header />
      <LayoutScreen>
        <PermissionsCarousel />
      </LayoutScreen>
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
    backgroundColor: theme.palette.primary.main,
  },
});

export default Screen;
