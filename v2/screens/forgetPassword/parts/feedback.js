import React from 'react';

import FeedbackModal from '../../../components/feedbackModal';
import { useContext } from '../context';

const Feedback = () => {
  const {
    screenPalette,
    feedback,
    hideFeedback: handleActionPress,
  } = useContext();

  const propsByFeedback = {
    [undefined]: {},
    finish: {
      title: 'Recuperação de senha',
      description: 'Enviamos as instruções para recuperação da sua senha para seu e-mail.',
      icon: 'mail',
      action: {
        text: 'FAZER LOGIN NO CLUBE',
        onPress: handleActionPress,
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
