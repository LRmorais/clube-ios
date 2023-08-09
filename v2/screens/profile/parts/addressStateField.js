import React from 'react';

import FormInput from '../../../components/input/form';
import {useContext} from '../context';

const AddressStateField = () => {
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
  const field = 'addressState';
  const inputRef = getInputRef(field);
  const value = (values[field] || '').toUpperCase();
  const handleChangeText = setValuesHOF(field);
  const handleBlur = checkErrorHOF(field);
  const handleSubmitEditing = focusNextFieldHOF(field);

  const feedback = {
    invalid: {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors[field]];

  return (
    <FormInput
      inputRef={inputRef}
      label="Estado"
      subtitle={automaticAddress ? undefined : 'Insira este dado'}
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="characters"
      autoCompleteType="off"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="send"
      textContentType="addressState"
      // editable={!automaticAddress}
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default AddressStateField;
