import React from 'react';
import {ScrollView, KeyboardAvoidingView, Platform} from 'react-native';

import createStyle from '../../utils/style';
import {useGlobalStateContext} from '../../hocs/globalState';

const LayoutScreen = props => {
  const {disableScroll} = useGlobalStateContext();

  return (
    <ScrollView
      {...props}
      scrollEnabled={disableScroll}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      bounces={false}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' && 'padding'}>
        {props.children}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
    zIndex: 0,
  },
  content: {
    flexGrow: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
});

export default LayoutScreen;
