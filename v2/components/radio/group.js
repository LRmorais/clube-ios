import React from 'react';
import { FlatList, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Radio from './index';
import createStyle from '../../utils/style';

const RadioGroup = (props) => {
  function handleChange(value) {
    props.onChange(value);
  }

  function renderItem({ item }) {
    return (
      <Radio
        {...item}
        checked={props.value === item.value}
        onChange={handleChange}
      />
    );
  }

  return (
    <View>
      {props.label && (
        <Text style={[
          styles.label,
          { color: props.color.label },
        ]}>
          {props.label}
        </Text>
      )}
      <FlatList
        data={props.data}
        renderItem={renderItem}
        horizontal={props.horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        keyExtractor={(item) => String(item.value)}
      />
    </View>
  );
};

RadioGroup.propTypes = {
  color: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }),
  data: PropTypes.array.isRequired,
  horizontal: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

RadioGroup.defaultProps = {
  horizontal: false,
};

const styles = createStyle((theme) => ({
  label: {
    marginBottom: theme.spacing(.5),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.lineHeight.mostCommon,
  },
  separator: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default RadioGroup;
