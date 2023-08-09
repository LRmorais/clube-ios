import React from 'react';

import FormInput from '../../../components/input/form';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useContext } from '../context';

const FullNameField = () => {
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    screenPalette,
    focusDocNumberField: handleSubmitEditing,
    fullName: value,
    setFullName: handleChangeText,
    errors,
    checkFullNameError,
  } = useContext();

  const feedback = {
    'invalid': {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors.fullName];

  function handleBlur() {
    dispatchRecord('Fim da digitação (nome completo)', {
      value,
    });
    checkFullNameError();
  }

  return (
    <FormInput
      label="Nome Completo"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="words"
      autoCompleteType="name"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="next"
      textContentType="name"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default FullNameField;
