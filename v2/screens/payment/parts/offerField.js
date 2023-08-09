import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import MessageBox from '../../../components/messageBox';
import RadioGroup from '../../../components/radio/group';
import createStyle from '../../../utils/style';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useContext } from '../context';

const OfferField = () => {
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    screenPalette,
    offers: data,
    offer: value,
    loadingOffers: loading,
    getOffers: handleMessagePress,
    setOffer,
    errors,
  } = useContext();

  const radioColors = {
    default: screenPalette.radio_box.default,
    defaultSelected: screenPalette.radio_box.default_selected,
    innerBall: screenPalette.radio_box.inner_ball,
    text: screenPalette.radio_box.text,
    textSelected: screenPalette.radio_box.text_selected,
  };

  function handleChange(value) {
    dispatchRecord('Seleção de assinatura', {
      value,
    });
    setOffer(value);
  }

  if (loading) return (
    <ActivityIndicator
      color={screenPalette.radio_box.text}
      size="large"
    />
  );

  if (!data) return null;

  if (data.error) {
    let propsByError = {
      unconnected: {
        icon: 'no-internet',
        children: 'Você não está conectado à internet! Tente de novo.',
      },
      unknown: {
        icon: 'error',
        children: 'Houve algum erro na requisição. Tente novamente.',
      },
    }[data.error];

    return (
      <MessageBox
        color={screenPalette.message_box}
        onPress={handleMessagePress}
        {...propsByError}
      />
    );
  };

  const feedback = {
    unselected: 'Selecione uma oferta',
  }[errors.offer];

  return (
    <View style={[
      styles.container,
      { backgroundColor: screenPalette.radio_box.background },
    ]}>
      <RadioGroup
        data={data.map((item) => ({
          value: item.number,
          label: item.description,
          color: radioColors,
        }))}
        value={value}
        onChange={handleChange}
      />
      {feedback && (
        <Text style={[
          styles.feedback,
          { color: screenPalette.input.feedback.warning },
        ]}>
          {feedback}
        </Text>
      )}
    </View>
  );
};

const styles = createStyle((theme) => ({
  container: {
    paddingVertical: theme.spacing(3.5),
    paddingHorizontal: theme.spacing(2.5),
    borderRadius: theme.spacing(1),
  },
  feedback: {
    marginTop: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
}));

export default OfferField;
