import React from 'react';

import FormInput from '../../../components/input/form';
import {useContext} from '../context';

const RegisterNumberField = () => {
  const {
    screenPalette,
    focusDocumentField: handleSubmitEditing,
    registrationNumber: value,
    setRegisterNumber: handleChangeText,
    errors,
    checkFullnameError: handleBlur,
  } = useContext();

  const feedback = {
    invalid: {
      type: 'error',
      message: 'Matricula inválido',
      icon: 'error',
    },
  }[errors.registrationNumber];

  return (
    <FormInput
      placeholder="Ex: 12345678"
      label="Matrícula"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="off"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="next"
      textContentType="none"
      type="numeric"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default RegisterNumberField;
