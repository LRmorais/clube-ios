import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const CardCvcField = () => {
  const {
    values,
    errors,
    fieldColor,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
    save,
  } = useContext();
  const field = 'cardCvc';
  const inputRef = getInputRef(field);
  const value = values[field] || '';
  const handleChangeText = setValuesHOF(field);
  const handleBlur = checkErrorHOF(field);
  const focusNextField = focusNextFieldHOF(field);
  const handleSubmitEditing = focusNextField || save;
  const blurOnSubmit = !focusNextField;
  const returnKeyType = !!focusNextField ? 'next' : 'send';

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
      label="CVV"
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="none"
      autoCompleteType="cc-csc"
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

export default CardCvcField;
