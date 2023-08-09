import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const EmailField = () => {
  const {
    values,
    errors,
    fieldColor,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'email';
  const inputRef = getInputRef(field);
  const value = values[field] || '';
  const handleChangeText = setValuesHOF(field);
  const checkError = checkErrorHOF(field);
  const handleSubmitEditing = focusNextFieldHOF(field);

  const feedback = {
    'invalid': {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors[field]];

  function handleBlur() {
    checkError();
    handleSubmitEditing();
  }

  return (
    <FormInput
      inputRef={inputRef}
      label="E-mail*"
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="none"
      autoCompleteType="email"
      keyboardType="email-address"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="next"
      textContentType="emailAddress"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default EmailField;
