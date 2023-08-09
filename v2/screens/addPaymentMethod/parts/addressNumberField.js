import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const AddressNumberField = () => {
  const {
    values,
    errors,
    fieldColor,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'addressNumber';
  const inputRef = getInputRef(field);
  const value = values[field] || '';
  const handleChangeText = setValuesHOF(field);
  const handleBlur = checkErrorHOF(field);
  const handleSubmitEditing = focusNextFieldHOF(field);
  const blurOnSubmit = !handleSubmitEditing;
  const returnKeyType = !!handleSubmitEditing ? 'done' : 'next';

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
      label="Número"
      placeholder="S/N"
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="none"
      autoCompleteType="off"
      keyboardType="number-pad"
      autoCorrect={false}
      blurOnSubmit={blurOnSubmit}
      returnKeyType={returnKeyType}
      textContentType="none"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default AddressNumberField;
