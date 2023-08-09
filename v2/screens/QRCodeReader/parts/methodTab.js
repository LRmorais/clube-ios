import React from 'react';
import { View, Image } from 'react-native';

import Tabs from '../../../components/tabs';
import createStyle from '../../../utils/style';
import { useContext } from '../context';
import { useLayoutContext } from '../../../hocs/layout';

const MethodTab = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    method: selected,
    setMethod: handleChange,
  } = useContext();

  const data = [
    {
      text: 'QR Code',
      value: 'qrcode',
    },
    {
      text: 'Gerar cartão',
      value: 'card',
    },
  ];

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.primaryColor },
    ]}>
      <Tabs
        data={data}
        defaultColor={theme.contrastTextColor}
        defaultSelected={selected}
        onChange={handleChange}
      />
      <Image
        style={styles.shadow}
        source={require('../../../images/vectors/bottomShadow.png')}
        resizeMode="stretch"
      />
    </View>
  );
};

const styles = createStyle((theme) => ({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  shadow: {
    position: 'absolute',
    width: '100%',
    height: theme.spacing(.75),
    left: 0,
    right: 0,
    bottom: theme.spacing(-.75),
    zIndex: 1,
  },
}));

export default MethodTab;
