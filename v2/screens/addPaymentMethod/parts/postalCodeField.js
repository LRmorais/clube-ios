import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const PostalCodeField = () => {
  const {
    values,
    errors,
    fieldColor,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'postalCode';
  const inputRef = getInputRef(field);
  const value = (values[field] || '').split(/^(\d{5})/).filter(Boolean).join('-');
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
      label="CEP"
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="none"
      autoCompleteType="postal-code"
      keyboardType="number-pad"
      autoCorrect={false}
      blurOnSubmit
      returnKeyType="send"
      textContentType="none"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default PostalCodeField;
