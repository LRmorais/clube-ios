import React from 'react';

import FeedbackModal from '../../../components/feedbackModal';
import { useContext } from '../context';

const Feedback = () => {
  const {
    screenPalette,
    feedback,
    staticTheme,
    hideFeedback: handleActionPress,
    openStore: handleWrongAppPress,
  } = useContext();

  const propsByFeedback = {
    [undefined]: {},
    wrong: {
      title: 'Oops...',
      description: 'Verifique se você digitou corretamente os seus dados e tente novamente.',
      icon: 'error',
      action: {
        text: 'Tentar novamente',
        onPress: handleActionPress,
      },
    },
    any: {
      title: 'Oops...',
      description: 'Houve algum problema na requisição. Por favor, tente novamente.',
      icon: 'error',
      action: {
        text: 'Tentar novamente',
        onPress: handleActionPress,
      },
    },
    wrongApp: {
      title: 'Oops...',
      description: `Você é um usuário ${staticTheme?.title}. Baixe o app Clube Empresas prara continuar.`,
      icon: 'error',
      action: {
        text: 'Ir para a loja',
        onPress: handleWrongAppPress,
      },
    },
  }[feedback];

  return (
    <FeedbackModal
      visible={!!feedback}
      color={screenPalette.feedback}
      {...propsByFeedback}
    />
  );
};

export default Feedback;
