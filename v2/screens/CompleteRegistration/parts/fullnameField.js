import React from 'react';

import FormInput from '../../../components/input/form';
import {useContext} from '../context';

const FullnameField = () => {
  const {
    screenPalette,
    focusDocumentField: handleSubmitEditing,
    fullname: value,
    setFullname: handleChangeText,
    errors,
    checkFullnameError: handleBlur,
  } = useContext();

  const feedback = {
    invalid: {
      type: 'error',
      message: 'Nome inválido',
      icon: 'error',
    },
  }[errors.fullname];

  return (
    <FormInput
      placeholder="Ex: João Paulo"
      label="Nome Completo"
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

export default FullnameField;
