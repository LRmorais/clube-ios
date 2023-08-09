import React from 'react';

import FeedbackModal from '../../../components/feedbackModal';
import { useContext } from '../context';

const Feedback = () => {
  const {
    screenPalette,
    feedback,
    hideFeedback,
    goToOnBoardingScreen,
  } = useContext();

  const propsByFeedback = {
    error: {
      color: screenPalette.feedback.error,
      title: 'Pagamento recusado',
      description: 'Encontramos um problema na hora de processar seu pagamento. Por favor, tente novamente.',
      icon: 'error',
      action: {
        text: 'Tentar novamente',
        onPress: hideFeedback,
      },
    },
    success: {
      color: screenPalette.feedback.success,
      title: 'Pagamento aprovado',
      description: 'Seu pagamento foi aprovado! Bem-vindo(a) ao Clube Gazeta do Povo',
      icon: 'success',
      action: {
        text: 'Ir para o Clube',
        onPress() {
          hideFeedback();
          goToOnBoardingScreen();
        },
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

export default Feedback;
