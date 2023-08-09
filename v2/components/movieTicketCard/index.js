import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Platform,
  ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import Clipboard from '@react-native-clipboard/clipboard';

import createStyle from '../../utils/style';

const MovieTicketCard = props => {

  const copyToClipboard = (item) => {
    Clipboard.setString(item);
  };

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: props.color.background}]}
      activeOpacity={0.9}
      underlayColor={props.color.background}>
      <View style={styles.textsTop}>
        <Text style={[styles.bold, {color: props.color.text}]}>
          {props.text.title}
        </Text>
        <Text style={[styles.textTopMarginTop, {color: props.color.text}]}>
          Data da compra: {props.text.orderDate}
        </Text>
        <Text style={[styles.textTopMarginTop, {color: props.color.text}]}>
          Válido até: {props.text.validDate}
        </Text>
      </View>
      <View>
        {/* <Text style={[styles.textMain, {color: props.color.text}]}>
          {props.text.main}
        </Text> */}
        {props.text.main.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              copyToClipboard(item);
              if (Platform.OS === 'android') {
                ToastAndroid.show(
                  'Copiado para área de transferência',
                  ToastAndroid.SHORT,
                );
              }
            }}
            keyExtractor={(item, index) => index}
            style={{marginVertical: 5}}>
            <Text
              key={index}
              style={[styles.textMain, {color: props.color.text}]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.textBottom, {color: props.color.text}]}>
        {props.text.bottom}
      </Text>
    </TouchableOpacity>
  );
};

MovieTicketCard.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  text: PropTypes.shape({
    bottom: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    validDate: PropTypes.string.isRequired,
  }).isRequired,
};

MovieTicketCard.defaultProps = {
  loading: false,
};

const styles = createStyle(theme => ({
  container: {
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    width: '100%',
    aspectRatio: 39 / 30,
    paddingVertical: theme.spacing(3),
    paddingHorizontal: theme.spacing(4),
    borderRadius: theme.spacing(1),
  },
  textsTop: {
    flexDirection: 'column',
  },
  bold: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
  textTopMarginTop: {
    marginTop: theme.spacing(0.5),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
  textMain: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(25),
    textAlign: 'center',
  },
  textBottom: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
}));

export default MovieTicketCard;
