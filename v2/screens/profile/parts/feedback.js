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
    returnToPreviousScreen,
  } = useContext();

  const errorGeneralProps = {
    action: {
      text: 'OK',
      onPress: hideFeedBack,
    },
    color: {
      background: theme.red__main,
      button: theme.red__dark,
      text: theme.contrastTextColor,
    },
  };

  const propsByError = {
    success: {
      icon: 'success',
      title: 'Perfil atualizado!',
      action: {
        text: 'OK',
        onPress: () => {
          hideFeedBack();
          returnToPreviousScreen();
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
      ...errorGeneralProps,
    },
    phone: {
      icon: 'error',
      title: 'Oops...',
      description: 'Não foi possível salvar seu telefone. Por gentileza, tente novamente.',
      ...errorGeneralProps,
    },
    email: {
      icon: 'error',
      title: 'Oops...',
      description: 'Não foi possível salvar seu e-mail. Por gentileza, tente novamente.',
      ...errorGeneralProps,
    },
    info: {
      icon: 'error',
      title: 'Oops...',
      description: 'Não foi possível salvar seus dados. Por gentileza, tente novamente.',
      ...errorGeneralProps,
    },
    address: {
      icon: 'error',
      title: 'Oops...',
      description: 'Não foi possível salvar seu endereço. Por gentileza, tente novamente.',
      ...errorGeneralProps,
    },
    any: {
      icon: 'error',
      title: 'Oops...',
      description: 'Houve algum erro durante o processamento da requisição. Por gentileza, tente novamente.',
      ...errorGeneralProps,
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
