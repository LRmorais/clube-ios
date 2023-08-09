/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Platform, Linking} from 'react-native';
import IconFontAwe from 'react-native-vector-icons/dist/FontAwesome';
import IconFontAwe5 from 'react-native-vector-icons/dist/FontAwesome5';
import Badge from '../../../images/icons/badge-percent.svg';
import {AirbnbRating} from 'react-native-ratings';

import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import {useLayoutContext} from '../../../hocs/layout';
import {useAnalyticsContext} from '../../../hocs/analytics';
import {useContext} from '../context';
import createStyle from '../../../utils/style';

const Infos = () => {
  const {theme} = useLayoutContext();
  const {dispatchRecord} = useAnalyticsContext();
  const {unit, typeCategorie} = useContext();

  const hasHandler = unit.latitude && unit.longitude;

  function handlePress() {
    let scheme = {
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    }[Platform.OS];
    let coords = `${unit.latitude},${unit.longitude}`;
    let label = encodeURI(unit.fantasyName);
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
  // const rating = unit.rating !== [] && unit.rating ? unit.rating : [1];

  // var soma = unit.rating.reduce(function (somas, i) {
  //   return somas + i;
  // });
  // var media = soma / unit.rating?.length;

  var arr = unit.rating;

  var soma = 0;
  for (var i = 0; i < arr.length; i++) {
    soma += arr[i];
  }
  var media = soma / arr.length;

  return (
    <Box>
      <PaddingContainer>
        <View style={[styles.commonAlignmentRow]}>
          {/* <IconFeather
            name="percent"
            size={20}
            style={{color: theme.primaryColor}}
          /> */}
          <Badge fill={theme.primaryColor} height={23} width={23} />
          {unit.discountAmount ? (
            <Text style={[styles.firstText, {color: theme.primaryColor}]}>
              {unit.tag === 'Cinemas' || 'cinemas' ? (
                <>{`Até ${unit.discountAmount}% de desconto`}</>
              ) : (
                <>{`${unit.discountAmount}% de desconto`}</>
              )}
            </Text>
          ) : (
            <Text style={[styles.firstText, {color: theme.primaryColor}]}>
              Sem descontos
            </Text>
          )}
        </View>

        <View style={[styles.commonAlignmentRow]}>
          <IconFontAwe name="map-marker" size={23} color={theme.primaryColor} />

          <View style={styles.commonAlignmentColumn}>
            <Text style={[styles.firstText, {color: theme.primaryColor}]}>
              {unit.address}
              {unit.number ? `, ${unit.number}` : null}
            </Text>

            <Text style={[styles.secondText, {color: theme.primaryColor}]}>
              {`${unit.neighborhood}, ${unit.city}, ${unit.uf} - ${unit.zipcode}`}
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
            {unit.horarios.map(day => {
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
        {soma !== 0 ? (
          <View style={[styles.commonAlignmentRow, {alignItems: 'center'}]}>
            <IconFontAwe5 name={'star'} size={20} color={theme.primaryColor} />
            <AirbnbRating
              isDisabled={true}
              count={media}
              defaultRating={5}
              size={25}
              showRating={false}
              starContainerStyle={{marginLeft: 20}}
            />
            <Text style={[styles.firstText, {color: theme.primaryColor}]}>
              {`${media.toFixed(1)} (${unit.rating.length})`}
            </Text>
            {/* <View style={styles.commonAlignmentColumn}>
              <TouchableOpacity style={styles.commonButtons}>
                <Text style={[styles.textButtons]}>Ler Avaliações</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        ) : null}
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
