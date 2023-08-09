import React from 'react';

import FeedbackModal from '../../../components/feedbackModal';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Feedback = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    feedback,
    hideFeedback,
    returnToPreviousScreen,
  } = useContext();

  const propsByFeedback = {
    notEnough: {
      color: {
        background: theme.red__main,
        button: theme.red__dark,
        text: theme.contrastTextColor,
      },
      title: 'Oops...',
      description: 'Você ainda não tem saldo disponível suficiente para resgatar.',
      icon: 'error',
      action: {
        text: 'Ok!',
        onPress: hideFeedback,
      },
    },
    success: {
      color: {
        background: theme.green__main,
        button: theme.green__dark,
        text: theme.contrastTextColor,
      },
      title: 'Pronto!',
      description: 'Nós iremos entrar em contato com você sobre isso.',
      icon: 'success',
      action: {
        text: 'Ok!',
        onPress() {
          hideFeedback();
          returnToPreviousScreen();
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
