import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const PasswordField = () => {
  const {
    screenPalette,
    passwordFieldRef,
    password: value,
    setPassword: handleChangeText,
    errors,
    checkPasswordError: handleBlur,
    signUp: handleSubmitEditing,
  } = useContext();

  const feedback = {
    'invalid': {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors.password];

  return (
    <FormInput
      inputRef={passwordFieldRef}
      label="Senha"
      subtitle="Mínimo de 8 caracteres"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="password"
      autoCorrect={false}
      blurOnSubmit
      contextMenuHidden={true}
      returnKeyType="send"
      secureTextEntry={true}
      textContentType="password"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default PasswordField;
