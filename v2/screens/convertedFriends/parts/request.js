import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Request = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
    requestValue: handlePress,
  } = useContext();

  if (!data) return null;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.primaryColor },
      ]}
      activeOpacity={.85}
      onPress={handlePress}
    >
      <Text style={[
        styles.text,
        { color: theme.contrastTextColor }
      ]}>
        Solicitar resgate
      </Text>
    </TouchableOpacity>
  );
};

const styles = createStyle((theme) => ({
  container: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(2.5),
  },
  text: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(20),
    textAlign: 'center',
  },
}));

export default Request;