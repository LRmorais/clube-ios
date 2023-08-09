import React from 'react';

import FeedbackModal from '../../../components/feedbackModal';
import { useContext } from '../context';
import { useLayoutContext } from '../../../hocs/layout';

const Feedback = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    error,
    hideError,
    returnToPreviousScreen,
  } = useContext();

  function hideAndReturn() {
    hideError();
    returnToPreviousScreen();
  }

  const propsByError = {
    internet: {
      icon: 'no-internet',
      title: 'Sem conexão',
      description: 'Parece que você não está conectado à internet. Por gentileza, verifique e tente novamente.',
      action: {
        text: 'OK',
        onPress: hideAndReturn,
      },
    },
    any: {
      icon: 'error',
      title: 'Oops...',
      description: 'Houve algum problema no processamento da requisição. Por gentilza, tente novamente.',
      action: {
        text: 'OK',
        onPress: hideAndReturn,
      },
    },
    itemChange: {
      icon: 'error',
      title: 'Oops...',
      description: 'Houve algum problema no processamento da requisição. Por gentilza, tente novamente.',
      action: {
        text: 'OK',
        onPress: hideError,
      },
    },
  }[error];

  return (
    <FeedbackModal
      visible={!!error}
      {...propsByError}
      color={{
        background: theme.red__main,
        button: theme.red__dark,
        text: theme.contrastTextColor,
      }}
    />
  );
};

export default Feedback;
