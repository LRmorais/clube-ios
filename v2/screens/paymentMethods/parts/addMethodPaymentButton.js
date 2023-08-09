import React from 'react';

import PaddingContainer from '../../../components/paddingContainer';
import FloatingButton from '../../../components/button/floating';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const AddMethodPaymentButton = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    goToAddPaymentMethodScreen: handlePress,
  } = useContext();

  return (
    <PaddingContainer
      style={styles.container}
      pointerEvents="box-none"
    >
      <FloatingButton
        colors={{
          main: theme.secondButtonBackground,
          shadow: theme.secondButtonShadow,
          text: theme.secondButtonTextColor,
        }}
        text="Adicionar cartão"
        textSize="small"
        onPress={handlePress}
      />
    </PaddingContainer>
  );
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: theme.spacing(4),
    backgroundColor: 'transparent',
    zIndex: 200,
  },
}));

export default AddMethodPaymentButton;
