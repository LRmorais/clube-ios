import React from 'react';

import FloatingButton from '../../../components/button/floating';
import {useContext} from '../context';

const ContinueButton = (props) => {
  const {screenPalette, continueAction: handlePress} = useContext();

  return (
    <FloatingButton
      text={props.text}
      colors={screenPalette.payment_button}
      onPress={handlePress}
    />
  );
};

export default ContinueButton;
