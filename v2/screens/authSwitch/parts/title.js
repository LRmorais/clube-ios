import React from 'react';
import { Text } from 'react-native';

import createStyle from '../../../utils/style';
import { useContext } from '../context';

const Title = () => {
  const {
    screenPalette,
  } = useContext();

  return (
    <Text style={[
      styles.title,
      { color: screenPalette.text.title },
    ]}>
      VIVA MAIS, {'\n'}PAGUE MENOS
    </Text>
  );
};

const styles = createStyle((theme) => ({
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(24),
    lineHeight: 33,
  },
}));

export default Title;
