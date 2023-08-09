import React from 'react';

import FormInput from '../../../components/input/form';
import {maskCardNumber} from '../../../utils/data';
import {useAnalyticsContext} from '../../../hocs/analytics';
import {useContext} from '../context';

const CardNumberField = () => {
  const {dispatchRecord} = useAnalyticsContext();
  const {
    screenPalette,
    focusCardHolderField: handleSubmitEditing,
    cardNumber: value,
    setCardNumber,
    errors,
    checkCardNumberError,
  } = useContext();

  function handleChangeText(value) {
    setCardNumber(maskCardNumber(value));
  }

  function handleBlur() {
    dispatchRecord('Fim da digitação (número)');
    checkCardNumberError();
  }

  const feedback = {
    invalid: {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors.cardNumber];

  return (
    <FormInput
      label="Número do cartão"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="cc-number"
      autoCorrect={false}
      blurOnSubmit={false}
      keyboardType="number-pad"
      maxLength={19}
      returnKeyType="next"
      textContentType="creditCardNumber"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default CardNumberField;
