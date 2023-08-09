import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const CardValidityField = () => {
  const {
    values,
    errors,
    fieldColor,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'cardValidity';
  const inputRef = getInputRef(field);
  const value = (values[field] || '').split(/(\d{1,2})/g).filter(Boolean).join('/');
  const handleChangeText = setValuesHOF(field);
  const handleBlur = checkErrorHOF(field);
  const handleSubmitEditing = focusNextFieldHOF(field);

  const feedback = {
    'invalid': {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors[field]];

  return (
    <FormInput
      inputRef={inputRef}
      label="Validade"
      placeholder="MM/AA"
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="none"
      autoCompleteType="cc-exp"
      keyboardType="number-pad"
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

export default CardValidityField;
