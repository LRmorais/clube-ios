import React from 'react';

import FeedbackModal from '../../../components/feedbackModal';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const InfoModal = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    feedback,
    hideFeedback : handleActionPress,
  } = useContext();

  const propsByFeedback = {
    [feedback]: {
      icon: 'coupon',
      title: 'Cupom ativado!\nCódigo:',
      subtitle: feedback,
      subtitleCopyable: true,
      description: 'Informe este código no ato da compra. Consulte as regras de uso do parceiro para mais detalhes.',
      action: {
        text: 'Fechar',
        onPress: handleActionPress,
      },
      color: {
        background: theme.green__main,
        button: theme.green__dark,
        text: theme.contrastTextColor,
      },
    },
    error: {
      icon: 'error',
      title: 'Oops...',
      description: 'Houve algum problema. Por gentileza, tente novamente.',
      action: {
        text: 'OK',
        onPress: handleActionPress,
      },
      color: {
        background: theme.red__main,
        button: theme.red__dark,
        text: theme.contrastTextColor,
      },
    },
    noInternet: {
      icon: 'no-internet',
      title: 'Sem internet',
      description: 'Você não está conectado à internet. Conecte-se e tente novamente.',
      action: {
        text: 'OK',
        onPress: handleActionPress,
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
      {...propsByFeedback}
    />
  );
};

export default InfoModal;
