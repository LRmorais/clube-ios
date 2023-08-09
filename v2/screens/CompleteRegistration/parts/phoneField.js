import React from 'react';
import {Platform} from 'react-native';
import FormInput from '../../../components/input/form';
import {useContext} from '../context';

const PhoneField = () => {
  const {
    screenPalette,
    phoneFieldRef,
    focusEmailField: handleSubmitEditing,
    phone: value,
    validatePhone: handleChangeText,
    errors,
    checkPhoneError: handleBlur,
  } = useContext();

  const feedback = {
    invalid: {
      type: 'error',
      message: 'Número inválido',
      icon: 'error',
    },
  }[errors.phone];

  const maskPhone = valor => {
    let value = valor.replace(/\D/g, '');
    if (value.length === 0) {
      return '';
    }

    return value
      .replace(/^(\d{2})/, '($1) ')
      .replace(/(\d{5})(\d{4})$/, '$1-$2')
      .replace(/(\d{4})(\d+)$/, '$1-$2');
  };
  const valores = maskPhone(value);

  return (
    <FormInput
      inputRef={phoneFieldRef}
      placeholder="(   )"
      label="Telefone ou Celular"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="off"
      keyboardType="number-pad"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
      textContentType="none"
      value={valores}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default PhoneField;
