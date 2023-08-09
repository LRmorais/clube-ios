import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const DocField = () => {
  const {
    values,
    fieldColor,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'doc';
  const inputRef = getInputRef(field);
  const value = values[field] || '';
  const handleChangeText = setValuesHOF(field);
  const checkError = checkErrorHOF(field);
  const handleSubmitEditing = focusNextFieldHOF(field);

  function handleBlur() {
    checkError();
    handleSubmitEditing();
  }

  return (
    <FormInput
      inputRef={inputRef}
      label="CPF"
      editable={false}
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

export default DocField;
