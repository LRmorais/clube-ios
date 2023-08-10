import React from 'react';

import FloatingButton from '../../../components/button/floating';
import { theme } from '../../../utils/style';
import { useContext } from '../context';

const GoogleButton = () => {
  const {
    // signInWithGoogle: handlePress,
  } = useContext();

  return (
    <FloatingButton
      text="Google"
      colors={{
        main: theme.palette.google.main,
        shadow: theme.palette.google.dark,
        text: 'white',
      }}
      icon="google"
      textSize="small"
      // onPress={handlePress}
    />
  );
};

export default GoogleButton;
