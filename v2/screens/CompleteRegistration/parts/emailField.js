import React from 'react';

import FormInput from '../../../components/input/form';
import {useContext} from '../context';

const EmailField = () => {
  const {
    screenPalette,
    emailFieldRef,
    email: value,
    validateEmail: handleChangeText,
    errors,
    checkEmailError: handleBlur,
  } = useContext();

  const feedback = {
    invalid: {
      type: 'error',
      message: 'E-mail inválido',
      icon: 'error',
    },
  }[errors.email];

  return (
    <FormInput
      inputRef={emailFieldRef}
      placeholder="pedro@email.com"
      label="E-mail"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="off"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="next"
      textContentType="none"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
    />
  );
};

export default EmailField;
