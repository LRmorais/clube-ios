import React from 'react';

import FloatingButton from '../../../components/button/floating';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const IndicateButton = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    save: handlePress,
  } = useContext();

  return (
    <FloatingButton
      colors={{
        main: theme.primaryButtonBackground,
        shadow: theme.primaryButtonShadow,
        text: theme.primaryButtonTextColor,
      }}
      text="Enviar sugestão"
      onPress={handlePress}
    />
  );
};

export default IndicateButton;
