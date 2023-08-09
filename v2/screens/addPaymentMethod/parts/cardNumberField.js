import React from 'react';

import FormInput from '../../../components/input/form';
import { getCardBanner } from '../../../utils/data';
import { useContext } from '../context';

const CardNumberField = () => {
  const {
    values,
    errors,
    fieldColor,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
  } = useContext();
  const field = 'cardNumber';
  const inputRef = getInputRef(field);
  const value = (values[field] || '').split(/(\d{1,4})/g).filter(Boolean).join(' ');
  const handleChangeText = setValuesHOF(field);
  const handleBlur = checkErrorHOF(field);
  const handleSubmitEditing = focusNextFieldHOF(field);
  const banner = {
    Amex: 'cc-amex',
    Diners: 'cc-diners-club',
    Discover: 'cc-discover',
    Master: 'cc-mastercard',
    Visa: 'cc-visa',
  }[getCardBanner(value)];

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
      feedback={feedback}
      suffixIcon={banner}
      color={fieldColor}
      autoCapitalize="none"
      autoCompleteType="cc-number"
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

export default CardNumberField;
