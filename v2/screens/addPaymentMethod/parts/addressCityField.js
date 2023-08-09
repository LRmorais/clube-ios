import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const AddressCityField = () => {
  const {
    values,
    errors,
    automaticAddress,
    getInputRef,
    fieldColor,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'addressCity';
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
      label="Cidade"
      subtitle={automaticAddress ? undefined : 'Insira este dado'}
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="words"
      autoCompleteType="off"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="next"
      textContentType="addressCity"
      editable={!automaticAddress}
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default AddressCityField;
