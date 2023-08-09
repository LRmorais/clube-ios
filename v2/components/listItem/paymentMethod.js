import React, { useRef } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import CircleIcon from '../icons/circle';
import showOptionsMenu from '../../helpers/optionsMenu';
import createStyle from '../../utils/style';

const PaymentMethodListItem = (props) => {
  const iconRef = useRef();
  const opacity = props.selected ? 1 : .5;
  const checkboxColor = props.color.checked || props.color.text;

  function handleOptionsPress() {
    showOptionsMenu(props.options, iconRef.current);
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={props.onSelect ? .75 : 1}
      onPress={props.onSelect}
    >
      {props.onSelect && (
        <View style={[
          styles.checkbox,
          {
            opacity,
            borderColor: checkboxColor,
          },
        ]}>
          {props.selected && (
            <Icon
              id="check"
              size={9}
              style={{ color: checkboxColor }}
            />
          )}
        </View>
      )}
      <Text
        style={[
          styles.text,
          {
            opacity,
            color: props.color.text,
          },
        ]}
        numberOfLines={1}
        ellipsizeMode="middle"
      >
        {props.cardDetails}
      </Text>
      {props.options && (
        <CircleIcon
          iconRef={iconRef}
          id="more-vertical"
          size="small"
          iconColor={props.color.text}
          backgroundColor="transparent"
          onPress={handleOptionsPress}
        />
      )}
    </TouchableOpacity>
  );
};

PaymentMethodListItem.propTypes = {
  cardDetails: PropTypes.string.isRequired,
  color: PropTypes.shape({
    checked: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func,
  options: PropTypes.array,
  selected: PropTypes.bool.isRequired,
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing(1),
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginRight: theme.spacing(2.5),
    borderWidth: 2,
    borderRadius: 2,
  },
  text: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(20),
  },
}));

export default PaymentMethodListItem;
