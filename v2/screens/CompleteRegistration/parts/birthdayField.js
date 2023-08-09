import React from 'react';
import {Platform} from 'react-native';
import FormInput from '../../../components/input/form';
import {useContext} from '../context';

const BirthdayField = () => {
  const {
    screenPalette,
    birthdayFieldRef,
    focusBirthdayField: handleSubmitEditing,
    birthday: value,
    validateBirthday: handleChangeText,
    errors,
    checkBirthdayError: handleBlur,
  } = useContext();

  const feedback = {
    invalid: {
      type: 'error',
      message: 'Data inválido',
      icon: 'error',
    },
  }[errors.birthday];

  const maskBirthday = valor => {
    let values = valor.replace(/\D/g, '');
    if (values.length === 0) {
      return '';
    }

    let {day, month, year} = values.match(
      /(?<day>\d{0,2})(?<month>\d{0,2})(?<year>\d{0,4})/,
    ).groups;
    return [day, month, year].filter(Boolean).join('/');
  };

  const valores = maskBirthday(value);

  return (
    <FormInput
      inputRef={birthdayFieldRef}
      label="Data de nascimento"
      placeholder="dd/mm/aaaa"
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

export default BirthdayField;
