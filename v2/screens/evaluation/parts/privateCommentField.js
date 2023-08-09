import React from 'react';

import FormInput from '../../../components/input/form';
import { useLayoutContext } from '../../../hocs/layout';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useContext } from '../context';

const PrivateCommentField = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    privateComment: value,
    setPrivateComment,
  } = useContext();

  function handleChangeText(value) {
    setPrivateComment(value.slice(0, 150));
  }

  function handleBlur() {
    dispatchRecord('Fim da digitação (privado)', {
      value,
    });
  }

  return (
    <FormInput
      label="Comentário oculto"
      subtitle="Apenas o estabelecimento poderá visualizar."
      color={{
        background: theme.inputBackground,
        text: theme.inputTextColor,
        label: theme.textPrimaryColor,
        subtitle: theme.textPrimaryColor,
      }}
      autoCapitalize="sentences"
      autoCompleteType="off"
      autoCorrect={false}
      returnKeyType="done"
      textContentType="none"
      multiline
      numberOfLines={4}
      value={value}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
    />
  );
};

export default PrivateCommentField;
