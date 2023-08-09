import React from 'react';

import FormInput from '../../../components/input/form';
import {useAnalyticsContext} from '../../../hocs/analytics';
import {useContext} from '../context';

const CardHolderField = () => {
  const {dispatchRecord} = useAnalyticsContext();
  const {
    screenPalette,
    cardHolderRef,
    focusCardValidityField: handleSubmitEditing,
    cardHolder: value,
    setCardHolder,
    errors,
    checkCardHolderError,
  } = useContext();

  // function handleChangeText(valor) {
  //   setCardHolder(valor.toUpperCase());
  // }

  function handleBlur() {
    dispatchRecord('Fim da digitação (titular)');
    checkCardHolderError();
  }

  const feedback = {
    invalid: {
      type: 'warning',
      message: 'Valor inválido',
      icon: 'warning',
    },
  }[errors.cardHolder];

  return (
    <FormInput
      inputRef={cardHolderRef}
      label="Nome impresso no cartão"
      feedback={feedback}
      color={screenPalette.input}
      autoCapitalize="characters"
      autoCompleteType="name"
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType="next"
      textContentType="name"
      // value={value}
      value={value}
      onBlur={handleBlur}
      // onChangeText={handleChangeText}
      onChangeText={text => setCardHolder(text)}
      onSubmitEditing={handleSubmitEditing}
    />
  );
};

export default CardHolderField;
