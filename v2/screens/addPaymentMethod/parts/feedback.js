import React from 'react';

import FeedbackModal from '../../../components/feedbackModal';
import { useContext } from '../context';
import { useLayoutContext } from '../../../hocs/layout';

const Feedback = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    feedback,
    hideFeedBack,
    goToPaymentMethodsScreen,
  } = useContext();

  const propsByError = {
    success: {
      icon: 'success',
      title: 'Cartão adicionado!',
      description: 'Você já pode usá-lo para realizar pagamentos.',
      action: {
        text: 'OK',
        onPress: () => {
          hideFeedBack();
          goToPaymentMethodsScreen();
        },
      },
      color: {
        background: theme.green__main,
        button: theme.green__dark,
        text: theme.contrastTextColor,
      },
    },
    noInternet: {
      icon: 'no-internet',
      title: 'Sem conexão',
      description: 'Parece que você não está conectado à internet. Verifique e tente novamente.',
      action: {
        text: 'OK',
        onPress: hideFeedBack,
      },
      color: {
        background: theme.red__main,
        button: theme.red__dark,
        text: theme.contrastTextColor,
      },
    },
    any: {
      icon: 'error',
      title: 'Oops...',
      description: 'Houve algum erro durante o processamento da requisição. Por gentileza, tente novamente.',
      action: {
        text: 'OK',
        onPress: hideFeedBack,
      },
      color: {
        background: theme.red__main,
        button: theme.red__dark,
        text: theme.contrastTextColor,
      },
    },
  }[feedback];

  return (
    <FeedbackModal
      visible={!!feedback}
      {...propsByError}
    />
  );
};

export default Feedback;
