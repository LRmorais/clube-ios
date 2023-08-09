import React from 'react';

import FormInput from '../../../components/input/form';
import { maskDoc } from '../../../utils/data';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useContext } from '../context';

const DocNumberField = () => {
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    screenPalette,
    docNumberFieldRef,
    focusEmailField: handleSubmitEditing,
    docNumber: value,
    setDocNumber,
    errors,
    checkDocNumberError,
  } = useContext();

  function handleChangeText(value) {
    setDocNumber(maskDoc(value));
  }

  const feedback = {
    'invalid': {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
    'repeated': {
      type: 'error',
      message: 'Já está em uso',
      icon: 'error',
    },
  }[errors.docNumber];

  function handleBlur() {
    dispatchRecord('Fim da digitação (documento)', {
      value,
    });
    checkDocNumberError();
  }

  return (
    <FormInput
      inputRef={docNumberFieldRef}
      label="CPF"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="off"
      autoCorrect={false}
      blurOnSubmit={false}
      keyboardType="number-pad"
      returnKeyType="next"
      textContentType="none"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default DocNumberField;
