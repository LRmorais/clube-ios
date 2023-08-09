import React from 'react';

import FormInput from '../../../components/input/form';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useContext } from '../context';
import { maskDoc } from '../../../utils/data';

const CpfField = () => {
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    screenPalette,
    focusDocNumberField: handleSubmitEditing,
    setCPFField,
    dataUser,
    errors,
  } = useContext();

  function handleChangeText(value) {
    setCPFField(maskDoc(value));
  }

  const feedback = {
    'invalid': {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors.cpf];

  function handleBlur() {
    // dispatchRecord('Fim da digitação (documento)', {
    //   value,
    // });
    // checkDocNumberError();
  }

  return (
    <FormInput
      label="CPF"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="words"
      autoCompleteType="name"
      autoCorrect={false}
      blurOnSubmit={false}
      keyboardType="number-pad"
      returnKeyType="next"
      textContentType="name"
      value={dataUser.cpf}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default CpfField;
