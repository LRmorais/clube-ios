import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {formatPrice} from '../../utils/data';

const MovieTicketListItem = props => {
  const {screenWidth} = useLayoutContext();

  return (
    <TouchableOpacity
      style={[props.expired && styles.containerOpacity]}
      activeOpacity={props.expired ? 1 : 0.75}
      onPress={props.expired ? undefined : props.onPress}>
      <View style={styles.firstLine}>
        <Text style={[styles.partner, {color: props.color.text}]}>
          {props.text.partner}
        </Text>
        <Text
          style={[styles.price, {color: props.color.text}]}
          numberOfLines={1}>
          {formatPrice(props.text.price)}
        </Text>
      </View>
      <Text style={[styles.texts, {color: props.color.text}]}>
        Código:{' '}
        <Text
          style={[
            styles.code,
            {color: props.expired ? props.color.expired : props.color.text},
          ]}>
          {props.expired ? 'Expirado' : props.text.code}
        </Text>
      </Text>
      <Text style={[styles.texts, {color: props.color.text}]}>
        Válido em: {props.text.validDays}
      </Text>
      <Text style={[styles.texts, {color: props.color.text}]}>
        Data da compra: {props.text.orderDate}.
      </Text>
      <Text style={[styles.texts, styles.textsLast, {color: props.color.text}]}>
        Valido até: {props.text.validDate}.
      </Text>
      <View style={styles.buttonContainer}>
        <Text style={[styles.button, {color: props.color.button}]}>
          Ver regras
        </Text>
        <Icon
          id="arrow-right"
          size={11}
          style={[styles.arrow, {color: props.color.button}]}
        />
      </View>
    </TouchableOpacity>
  );
};

MovieTicketListItem.propTypes = {
  color: PropTypes.shape({
    button: PropTypes.string.isRequired,
    expired: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  expired: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.shape({
    code: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    partner: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    validDate: PropTypes.string.isRequired,
    validDays: PropTypes.string.isRequired,
  }),
};

const styles = createStyle(theme => ({
  containerOpacity: {
    opacity: 0.5,
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  partner: {
    marginRight: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(19),
  },
  price: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(19),
  },
  texts: {
    marginBottom: theme.spacing(0.25),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(18),
  },
  code: {
    fontFamily: theme.typography.fontFamily.bold,
  },
  textsLast: {
    marginBottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  button: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textTransform: 'uppercase',
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(18),
  },
  arrow: {
    marginLeft: theme.spacing(1),
  },
}));

export default MovieTicketListItem;
