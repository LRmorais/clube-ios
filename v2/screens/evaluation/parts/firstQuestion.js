import React from 'react';
import { Text } from 'react-native';

import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const FirstQuestion = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    screenPalette,
    place,
  } = useContext();

  return (
    <Text style={[
      styles.container,
      { color: theme.textPrimaryColor },
    ]}>
      Qual a sua opinião sobre
      {' '}
      <Text style={styles.bold}>
        {place.fantasyName}
      </Text>
      ?
    </Text>
  );
};

const styles = createStyle((theme) => ({
  container: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
  bold: {
    fontFamily: theme.typography.fontFamily.bold,
  },
}));

export default FirstQuestion;
