import React from 'react';
import { Text } from 'react-native';

import Spacer from '../../../components/spacer';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const SecondQuestion = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    rating,
  } = useContext();

  if (!rating) return null;

  return (
    <>
      <Spacer size={4} fixedSize />
      <Text style={[
        styles.container,
        { color: theme.textPrimaryColor },
      ]}>
        O que você mais gostou da experiência?
      </Text>
    </>
  );
};

const styles = createStyle((theme) => ({
  container: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
}));

export default SecondQuestion;
