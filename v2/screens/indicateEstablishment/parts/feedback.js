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
    backScreen
  } = useContext();

  const propsByFeedback = {
    success: {
      color: {
        background: theme.green__main,
        button: theme.green__dark,
        text: theme.contrastTextColor,
      },
      title: 'Arrasou na sugestão, colega!',
      description: 'Nosso time entrará em contato com o estabelecimento. Obrigado por nos ajudar a montar um elenco de parceiros cada vez mais forte ;)',
      icon: 'success',
      action: {
        text: 'Voltar',
        onPress() {
            backScreen();
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
