import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const BillingListItem = (props) => (
  <View style={[
    styles.container,
    props.topSpacing && styles.containerTopPadding,
  ]}>
    <Text style={[
      styles.text,
      props.textBold ? styles.textBold : styles.textNormal,
      { color: props.color },
    ]}>
      {props.description}
    </Text>
    <Text style={[
      styles.text,
      styles.valueText,
      props.textBold ? styles.textBold : styles.textNormal,
      { color: props.color },
    ]}>
      {props.value}
    </Text>
  </View>
);

BillingListItem.propTypes = {
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  textBold: PropTypes.bool,
  topSpacing: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

BillingListItem.defaultProps = {
  topSpacing: false,
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  containerTopPadding: {
    paddingTop: theme.spacing(2),
  },
  text: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(18),
  },
  textNormal: {
    fontFamily: theme.typography.fontFamily.regular,
  },
  textBold: {
    fontFamily: theme.typography.fontFamily.bold,
  },
  valueText: {
    paddingLeft: theme.spacing(2),
  },
}));

export default BillingListItem;
