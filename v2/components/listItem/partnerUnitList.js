import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import IconFontAwe from 'react-native-vector-icons/dist/FontAwesome';
import createStyle from '../../utils/style';

const PartnerUnitList = props => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
      <View style={[styles.container]}>
        <View style={styles.content}>
          <Text style={[styles.textPrimary, {color: props.color.primary}]}>
            {props.text.fantasyName}
          </Text>
          <Text
            style={[
              styles.textSecondary,
              {color: props.color.secondary},
            ]}>{`${props.text.address}, ${props.text.number}`}</Text>
          <Text
            style={[
              styles.textTerc,
              {color: props.color.secondary},
            ]}>{`${props.text.neighborhood}, ${props.text.city}, ${props.text.uf}`}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconFontAwe
              name="map-marker"
              size={23}
              color={props.color.secondary}
            />
            <Text
              style={[
                styles.textTerc,
                {color: props.color.secondary, marginHorizontal: 8},
              ]}>
              {props.text.distance}
            </Text>
          </View>
        </View>

        <View>
          <Icon name="angle-right" size={20} color={props.color.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

PartnerUnitList.propTypes = {
  _skeleton: PropTypes.bool,
  color: PropTypes.shape({
    image: PropTypes.string,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }),
};

PartnerUnitList.defaultProps = {
  _skeleton: false,
};

PartnerUnitList.Skeleton = props => (
  <PartnerUnitList
    _skeleton
    id={props.id}
    color={props.color}
    onPress={() => {}}
    text={{
      primary: '██████████████████████████████',
      secondary: '█████████',
    }}
  />
);

const styles = createStyle(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'column',
    width: '70%',
  },
  textPrimary: {
    marginBottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(15),
  },
  textSecondary: {
    marginBottom: theme.spacing(0.8),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(13),
  },
  textTerc: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(13),
  },
}));

export default PartnerUnitList;
