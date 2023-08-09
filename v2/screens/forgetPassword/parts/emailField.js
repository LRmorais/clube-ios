import React from 'react';

import FormInput from '../../../components/input/form';
import {useContext} from '../context';
import {maskDoc} from '../../../utils/data';

const EmailField = () => {
  const {
    screenPalette,
    handleSubmitEditing: handleSubmitEditing,
    setEmailField,
    email,
    errors,
    checkFullNameError: handleBlur,
  } = useContext();

  const feedback = {
    invalid: {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors.email];

  return (
    <FormInput
      label="E-mail"
      place
      placeholder="exemplo@email.com"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="name"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="next"
      textContentType="name"
      value={email}
      onBlur={handleBlur}
      onChangeText={setEmailField}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default EmailField;
