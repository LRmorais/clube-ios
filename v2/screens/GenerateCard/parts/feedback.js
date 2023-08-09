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
    hideFeedback: handleActionPress,
  } = useContext();

  const propsByFeedback = {
    [undefined]: {},
    error: {
      title: 'Erro de leitura',
      description: 'Encontramos um problema na hora de ler o QRCode. Tente novamente.',
      icon: 'error',
      action: {
        text: 'Tentar novamente',
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

export default Feedback;
