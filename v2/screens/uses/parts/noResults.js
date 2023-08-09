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
    uses,
    payments,
    tab,
    loadingUses,
    loadingPayments,
  } = useContext();
  const data = {
    default: uses,
    payments: payments,
  }[tab];
  const loading = {
    default: loadingUses,
    payments: loadingPayments,
  }[tab];

  if (data && data.length > 0) return null;

  return (
    <Box>
      <Text style={[
        styles.noResults,
        { color: theme.textPrimaryColor },
      ]}>
        {loading && 'Carregando dados...'}
        {!loading && data && data.length === 0 && ({
          default: 'Você ainda não utilizou descontos do Clube.',
          payments: 'Você ainda não fez pagamentos.',
        }[tab])}
        {!loading && data === false && 'Ops! Você está sem conexão.'}
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
