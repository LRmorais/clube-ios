import React from 'react';

import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import MessageBox from '../../../components/messageBox';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const CompleteProfileMessage = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    completeProfileModalVisible: visible,
    goToProfileScreen: handlePress,
  } = useContext();

  if (!visible) return null;

  return (
    <Box noGutters="bottom">
      <PaddingContainer>
        <MessageBox
          icon="user-check"
          color={{
            background: theme.primaryColor,
            icon: theme.contrastTextColor,
            text: theme.contrastTextColor,
          }}
          onPress={handlePress}
        >
          Para uma melhor experiência com o Clube Gazeta do Povo, complete seu perfil com seus dados pessoais.
        </MessageBox>
      </PaddingContainer>
    </Box>
  );
};

export default CompleteProfileMessage;
