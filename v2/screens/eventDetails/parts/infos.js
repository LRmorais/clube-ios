/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Platform, Linking} from 'react-native';
import IconFeather from 'react-native-vector-icons/dist/Feather';
import IconFontAwe from 'react-native-vector-icons/dist/FontAwesome';
import IconFontAwe5 from 'react-native-vector-icons/dist/FontAwesome5';

import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import {useLayoutContext} from '../../../hocs/layout';
import {useAnalyticsContext} from '../../../hocs/analytics';
import {useContext} from '../context';
import createStyle from '../../../utils/style';

const Infos = () => {
  const {theme} = useLayoutContext();
  const {dispatchRecord} = useAnalyticsContext();
  const {eventDetail} = useContext();

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

  return (
    <Box>
      <PaddingContainer>
        <View style={[styles.commonAlignmentRow]}>
          <IconFeather
            name="percent"
            size={20}
            style={{color: theme.primaryColor}}
          />
          {eventDetail.discountAmount ? (
            <Text style={[styles.firstText, {color: theme.primaryColor}]}>
              {`${eventDetail.discountAmount}% de desconto`}
            </Text>
          ) : (
            <Text style={[styles.firstText, {color: theme.primaryColor}]}>
              Evento Gratuito
            </Text>
          )}
        </View>

        <View style={[styles.commonAlignmentRow, {alignItems: 'center'}]}>
          <IconFontAwe5 name="store" size={14} color={theme.primaryColor} />
          <View style={styles.commonAlignmentColumn}>
            <Text style={[styles.firstText, {color: theme.primaryColor}]}>
              {place.name}
            </Text>

            {/* <TouchableOpacity style={styles.commonButtons}>
              <Text style={[styles.textButtons]}>Ver Parceiro</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={[styles.commonAlignmentRow]}>
          <IconFontAwe name="map-marker" size={23} color={theme.primaryColor} />

          <View style={styles.commonAlignmentColumn}>
            <Text style={[styles.firstText, {color: theme.primaryColor}]}>
              {place.address}
              {place.number ? `, ${place.number}` : null}
            </Text>

            <Text style={[styles.secondText, {color: theme.primaryColor}]}>
              {`${place.neighborhood}, ${place.city}, ${place.uf} - ${place.zipcode}`}
            </Text>

            <TouchableOpacity
              style={styles.commonButtons}
              onPress={hasHandler ? handlePress : undefined}>
              <Text style={[styles.textButtons, {marginTop: 5}]}>Ver mapa</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.commonAlignmentRow]}>
          <IconFontAwe5 name="clock" size={20} color={theme.primaryColor} />
          <View style={styles.commonAlignmentColumn}>
            <Text style={[styles.firstText, {color: theme.primaryColor}]}>
              Datas e Horários
            </Text>
            {eventDetail.programming.map(day => {
              return (
                <Text
                  style={[
                    styles.secondText,
                    {color: theme.primaryColor, marginBottom: 3},
                  ]}>
                  {day}
                </Text>
              );
            })}
          </View>
        </View>
      </PaddingContainer>
    </Box>
  );
};

const styles = createStyle(theme => ({
  commonAlignmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
  },
  commonAlignmentColumn: {
    flexDirection: 'column',
  },
  commonButtons: {
    paddingHorizontal: theme.spacing(3),
  },
  textButtons: {
    color: '#ffc133',
  },
  firstText: {
    paddingHorizontal: theme.spacing(3),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
    lineHeight: theme.spacing(4),
  },
  secondText: {
    paddingHorizontal: theme.spacing(3),
    fontFamily: theme.typography.fontFamily.regular,
  },
}));

export default Infos;
