import React from 'react';
import { Text } from 'react-native';

import Box from '../../../components/box';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const NoResults = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
  } = useContext();

  if (data && data.length > 0) return null;

  return (
    <Box>
      <Text style={[
        styles.noResults,
        { color: theme.textPrimaryColor },
      ]}>
        Não há nada aqui.
      </Text>
    </Box>
  );
};

const styles = createStyle((theme) => ({
  noResults: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
}));

export default NoResults;
