import React from 'react';

import FormInput from '../../../components/input/form';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { maskPhone } from '../../../utils/data';
import { useContext } from '../context';

const PhoneField = () => {
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    screenPalette,
    phoneFieldRef,
    focusPasswordField: handleSubmitEditing,
    phone: value,
    setPhone,
    errors,
    checkPhoneError,
  } = useContext();

  function handleChangeText(value) {
    setPhone(maskPhone(value));
  }

  const feedback = {
    'invalid': {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors.phone];

  function handleBlur() {
    dispatchRecord('Fim da digitação (telefone celular)', {
      value,
    });
    checkPhoneError();
  }

  return (
    <FormInput
      inputRef={phoneFieldRef}
      label="Telefone celular"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="tel"
      autoCorrect={false}
      blurOnSubmit={false}
      keyboardType="number-pad"
      returnKeyType="next"
      textContentType="telephoneNumber"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default PhoneField;
