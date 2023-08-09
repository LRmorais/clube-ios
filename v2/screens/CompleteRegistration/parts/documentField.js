import React from 'react';
import {Platform} from 'react-native';
import FormInput from '../../../components/input/form';
import {useContext} from '../context';

const DocumentField = () => {
  const {
    screenPalette,
    documentFieldRef,
    focusBirthdayField: handleSubmitEditing,
    document: value,
    // validate: handleChangeText,
    validateDocument: handleChangeText,
    errors,
    checkDocumentError: handleBlur,
  } = useContext();

  const feedback = {
    invalid: {
      type: 'error',
      message: 'CPF inválido',
      icon: 'error',
    },
  }[errors.document];

  return (
    <FormInput
      inputRef={documentFieldRef}
      placeholder="___.___.___-__"
      label="CPF"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="none"
      autoCompleteType="off"
      keyboardType="numeric"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
      textContentType="none"
      value={value}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default DocumentField;
