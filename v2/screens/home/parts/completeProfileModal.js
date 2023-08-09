import React from 'react';

import FeedbackModal from '../../../components/feedbackModal';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const CompleteProfileModal = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    goToProfileScreen,
    completeProfileModalVisible: visible,
    hideCompleteProfileModal,
  } = useContext();

  function handlePress() {
    hideCompleteProfileModal();
    goToProfileScreen();
  }

  return (
    <FeedbackModal
      visible={visible}
      icon="user-check"
      title="Complete seu perfil"
      description="Para uma melhor experiência com o Clube Gazeta do Povo, complete seu perfil com seus dados pessoais."
      action={{
        text: 'Completar perfil',
        onPress: handlePress,
      }}
      color={{
        background: theme.primaryColor,
        button: theme.primaryColorShade,
        text: theme.contrastTextColor,
      }}
    />
  );
};

export default CompleteProfileModal;
