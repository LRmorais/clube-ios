import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const NameField = () => {
  const {
    values,
    errors,
    fieldColor,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'name';
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
      label="Nome completo*"
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="words"
      autoCompleteType="name"
      keyboardType="default"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="next"
      textContentType="name"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default NameField;
