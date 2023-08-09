import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const AddressStreetField = () => {
  const {
    values,
    errors,
    automaticAddress,
    fieldColor,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'addressStreet';
  const inputRef = getInputRef(field);
  const value = values[field] || '';
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
      label="Logradouro"
      subtitle={automaticAddress ? undefined : 'Insira este dado'}
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="words"
      autoCompleteType="street-address"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="next"
      textContentType="none"
      editable={!automaticAddress}
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default AddressStreetField;
