import React from 'react';
import {Platform, Linking, Text} from 'react-native';

import InfoBox from '../../../components/infoBox';
import createStyle from '../../../utils/style';
import {useLayoutContext} from '../../../hocs/layout';
import {useAnalyticsContext} from '../../../hocs/analytics';
import {useContext} from '../context';

const Address = () => {
  const {theme} = useLayoutContext();
  const {dispatchRecord} = useAnalyticsContext();
  const {eventDetail, placeDescription, showAddress} = useContext();
  const place = eventDetail.eventPlace;
  const hasHandler = place.latitude && place.longitude;

  function handlePress() {
    let scheme = {
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    }[Platform.OS];
    let coords = `${place.latitude},${place.longitude}`;
    let label = encodeURI(place.name);
    let url = {
      ios: `${scheme}${label}@${coords}`,
      android: `${scheme}${coords}(${label})`,
    }[Platform.OS];
    try {
      dispatchRecord('Abrir localização no mapa');
      Linking.openURL(`${url}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`);
    } catch {
      //
    }
  }

  if (!showAddress) {
    return null;
  }

  return (
    <InfoBox
      icon="marker"
      title={place.name}
      color={{
        icon: theme.primaryColor,
        title: theme.primaryColor,
      }}
      onPress={hasHandler ? handlePress : undefined}>
      <Text style={[styles.description, {color: theme.textPrimaryColor}]}>
        {placeDescription}
      </Text>
    </InfoBox>
  );
};

const styles = createStyle(theme => ({
  description: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: 18,
  },
}));

export default Address;
