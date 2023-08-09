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
    text: value,
    setDescription,
  } = useContext();

  function handleBlur() {
    dispatchRecord('Fim da digitação (estabelecimento)', {
      value,
    });
  }

  return (
    <FormInput
      label="Existe algum estabelecimento que você gostaria de ver no Clube?"
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
      onChangeText={setDescription}
      onBlur={handleBlur}
    />
  );
};

export default PublicCommentField;
