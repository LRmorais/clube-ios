import React from 'react';

import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import MessageBox from '../../../components/messageBox';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const ErrorMessage = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    error,
    getData: handlePress,
  } = useContext();

  const message = {
    noInternet: 'Você não está conectado à internet.',
    any: 'Houve algum erro :(',
  }[error];

  const icon = {
    noInternet: 'no-internet',
    any: 'error',
  }[error];

  if (!error) return null;

  return (
    <Box fill>
      <PaddingContainer style={styles.innerContainer}>
        <MessageBox
          icon={icon}
          color={{
            background: theme.red__main,
            icon: theme.contrastTextColor,
            text: theme.contrastTextColor,
          }}
          onPress={handlePress}
        >
          {message}
          {'\n'}
          Pressione para tentar novamente.
        </MessageBox>
      </PaddingContainer>
    </Box>
  );
};

const styles = createStyle({
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ErrorMessage;
