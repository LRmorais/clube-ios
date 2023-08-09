import React from 'react';

import FloatingButton from '../../../components/button/floating';
import Spacer from '../../../components/spacer';
import { useLayoutContext } from '../../../hocs/layout';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useContext } from '../context';

const SubmitButton = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    rating,
    sendEvaluation,
  } = useContext();

  function handlePress() {
    dispatchRecord('Envio de avaliação');
    sendEvaluation();
  }

  if (!rating) return null;

  return (
    <>
      <Spacer size={3} fixedSize />
      <FloatingButton
        text="Enviar avaliação"
        textSize="small"
        colors={{
          main: theme.primaryButtonBackground,
          shadow: theme.primaryButtonShadow,
          text: theme.primaryButtonTextColor,
        }}
        onPress={handlePress}
      />
    </>
  );
};

export default SubmitButton;
