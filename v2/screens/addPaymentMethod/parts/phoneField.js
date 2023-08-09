import React from 'react';

import FormInput from '../../../components/input/form';
import { maskPhone } from '../../../utils/data';
import { useContext } from '../context';

const PhoneField = () => {
  const {
    values,
    errors,
    fieldColor,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'phone';
  const inputRef = getInputRef(field);
  const value = maskPhone(values[field]);
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
      label="Telefone celular"
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="none"
      autoCompleteType="tel"
      keyboardType="phone-pad"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="send"
      textContentType="telephoneNumber"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default PhoneField;
