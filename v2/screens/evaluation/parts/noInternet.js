import React from 'react';

import FeedbackModal from '../../../components/feedbackModal';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const NoInternet = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    noInternet: visible,
    goToHomeScreen: handlePress,
  } = useContext();

  return (
    <FeedbackModal
      visible={visible}
      color={{
        background: theme.red__main,
        button: theme.red__dark,
        text: theme.contrastTextColor,
      }}
      title="Sem internet"
      description="Parece que você não está conectado à internet agora; mas fique tranquilo, depois você poderá avaliar sua experiência :)"
      icon="no-internet"
      action={{
        text: 'OK!',
        onPress: handlePress,
      }}
    />
  );
};

export default NoInternet;
