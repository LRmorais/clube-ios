import React from 'react';

import FormInput from '../../../components/input/form';
import {useContext} from '../context';

const UsernameField = () => {
  const {
    screenPalette,
    focusPasswordField: handleSubmitEditing,
    username: value,
    setUsername: handleChangeText,
    errors,
    checkUsernameError: handleBlur,
  } = useContext();

  const feedback = {
    invalid: {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors.username];

  return (
    <FormInput
      placeholder="Informe seu CPF/Matrícula"
      label="CPF/Matrícula"
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
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default UsernameField;
