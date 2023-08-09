import React from 'react';
import { Text } from 'react-native';

import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const ErrorMessage = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    error,
  } = useContext();

  if (!error) return null;

  return (
    <Text style={[
      styles.message,
      { color: theme.textPrimaryColor },
    ]}>
      Houve algum erro ao carregar avaliações
    </Text>
  );
};

const styles = createStyle((theme) => ({
  message: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
}));

export default ErrorMessage;
