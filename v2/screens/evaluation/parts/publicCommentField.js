import React from 'react';

import FormInput from '../../../components/input/form';
import { useLayoutContext } from '../../../hocs/layout';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useContext } from '../context';

const PublicCommentField = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    publicComment: value,
    setPublicComment,
  } = useContext();

  function handleChangeText(value) {
    setPublicComment(value.slice(0, 200));
  }

  function handleBlur() {
    dispatchRecord('Fim da digitação (público)', {
      value,
    });
  }

  return (
    <FormInput
      label="Deixe seu comentário"
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
      numberOfLines={7}
      value={value}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
    />
  );
};

export default PublicCommentField;
