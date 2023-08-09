import React from 'react';

import FormInput from '../../../components/input/form';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useContext } from '../context';

const PasswordField = () => {
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    screenPalette,
    cardCvcRef,
    cardCvc: value,
    setCardCvc: handleChangeText,
    paySubscription: handleSubmitEditing,
    errors,
    checkCardCvcError,
  } = useContext();

  const feedback = {
    invalid: {
      type: 'warning',
      icon: 'warning',
    },
  }[errors.cardCvc];

  function handleBlur() {
    dispatchRecord('Fim da digitação (CCV)');
    checkCardCvcError();
  }

  return (
    <FormInput
      inputRef={cardCvcRef}
      label="CCV"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="cc-csc"
      autoCorrect={false}
      blurOnSubmit
      keyboardType="number-pad"
      maxLength={4}
      returnKeyType="send"
      textContentType="password"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default PasswordField;
