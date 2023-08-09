import React from 'react';

import FormInput from '../../../components/input/form';
import { maskCardValidity } from '../../../utils/data';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useContext } from '../context';

const CardValidityField = () => {
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    screenPalette,
    cardValidityRef,
    focusCardCvcField: handleSubmitEditing,
    cardValidity: value,
    setCardValidity,
    errors,
    checkCardValidityError,
  } = useContext();

  function handleChangeText(value) {
    setCardValidity(maskCardValidity(value));
  }

  function handleBlur() {
    dispatchRecord('Fim da digitação (validade)');
    checkCardValidityError();
  }

  const feedback = {
    invalid: {
      type: 'warning',
      icon: 'warning',
    },
  }[errors.cardValidity];

  return (
    <FormInput
      inputRef={cardValidityRef}
      label="Data de validade"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="cc-exp"
      autoCorrect={false}
      blurOnSubmit={false}
      keyboardType="number-pad"
      maxLength={7}
      returnKeyType="next"
      textContentType="none"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default CardValidityField;
