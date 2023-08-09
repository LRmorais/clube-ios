import React from 'react';

import FormInput from '../../../components/input/form';
import { useContext } from '../context';

const CardHolderField = () => {
  const {
    values,
    errors,
    fieldColor,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'cardHolder';
  const value = (values[field] || '').toUpperCase();
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
      label="Nome impresso no cartão"
      feedback={feedback}
      color={fieldColor}
      autoCapitalize="characters"
      autoCompleteType="off"
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

export default CardHolderField;
