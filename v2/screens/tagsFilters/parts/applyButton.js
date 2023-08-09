import React from 'react';
import { View } from 'react-native';

import PaddingContainer from '../../../components/paddingContainer';
import FloatingButton from '../../../components/button/floating';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const ApplyButton = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    applyFilters: handlePress,
  } = useContext();

  return (
    <View
      style={styles.absoluteButton}
      pointerEvents="box-none"
    >
      <PaddingContainer>
        <FloatingButton
          text="Aplicar estes filtros"
          textSize="small"
          colors={{
            main: theme.secondButtonBackground,
            shadow: theme.secondButtonShadow,
            text: theme.secondButtonTextColor,
          }}
          onPress={handlePress}
        />
      </PaddingContainer>
    </View>
  );
};

const styles = createStyle((theme) => ({
  absoluteButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: theme.spacing(4.5),
    backgroundColor: 'transparent',
    zIndex: 200,
  },
}));

export default ApplyButton;
