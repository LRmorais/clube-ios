import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const PasswordField = () => {
  const {
    screenPalette,
    focusDocNumberField: handleSubmitEditing,
    dataUser,
    setPasswordField: handleChangeText,
    errors,
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
      label="Senha"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="password"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="next"
      textContentType="password"
      secureTextEntry={true}
      value={dataUser.password}
      //onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default PasswordField;
