import React from 'react';

import FormInput from '../../../components/input/form';
import { maskBirthday } from '../../../utils/data';
import { useContext } from '../context';

const BirthdayField = () => {
  const {
    values,
    errors,
    fieldColor,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'birthday';
  const inputRef = getInputRef(field);
  const value = maskBirthday(values[field]);
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
      label="Data de nascimento"
      placeholder="dd/mm/aaaa"
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="none"
      autoCompleteType="off"
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

export default BirthdayField;
