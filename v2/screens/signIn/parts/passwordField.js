import React from 'react';

import FormInput from '../../../components/input/form';
import {useContext} from '../context';

const PasswordField = () => {
  const {
    screenPalette,
    passwordFieldRef,
    password: value,
    setPassword: handleChangeText,
    signIn: handleSubmitEditing,
    errors,
    checkPasswordError: handleBlur,
  } = useContext();

  const feedback = {
    invalid: {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
    wrong: {
      type: 'error',
      message: 'Usuário ou senha incorreto',
    },
  }[errors.password];

  return (
    <FormInput
      placeholder="********"
      inputRef={passwordFieldRef}
      label="Senha"
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
