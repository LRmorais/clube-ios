import React from 'react';

import FormInput from '../../../components/input/form';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useContext } from '../context';

const EmailField = () => {
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    screenPalette,
    emailFieldRef,
    focusPhoneField: handleSubmitEditing,
    email: value,
    setEmail: handleChangeText,
    errors,
    checkEmailError,
  } = useContext();

  const feedback = {
    'invalid': {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors.email];

  function handleBlur() {
    dispatchRecord('Fim da digitação (e-mail)', {
      value,
    });
    checkEmailError();
  }

  return (
    <FormInput
      inputRef={emailFieldRef}
      label="E-mail"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="email"
      autoCorrect={false}
      blurOnSubmit={false}
      keyboardType="email-address"
      returnKeyType="next"
      textContentType="emailAddress"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default EmailField;
