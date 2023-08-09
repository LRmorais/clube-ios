import React from 'react';

import FloatingButton from '../../../components/button/floating';
import { theme } from '../../../utils/style';
import { useContext } from '../context';

const FacebookButton = () => {
  const {
    signInWithFacebook: handlePress,
  } = useContext();

  return (
    <FloatingButton
      text="Facebook"
      colors={{
        main: theme.palette.facebook.main,
        shadow: theme.palette.facebook.dark,
        text: 'white',
      }}
      icon="facebook"
      textSize="small"
      onPress={handlePress}
    />
  );
};

export default FacebookButton;
