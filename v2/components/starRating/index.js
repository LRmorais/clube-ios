import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import createStyle from '../../utils/style';

const StarRating = (props) => {
  function handlePressHOF(value) {
    if (props.readOnly) return;

    return function() {
      if (props.onChange) props.onChange(value);
    }
  }

  function renderItem({ item: value }) {
    let checked = (props.value || 0) >= value;

    return (
      <TouchableOpacity
        activeOpacity={props.readOnly ? 1 : .75}
        onPress={handlePressHOF(value)}
      >
        <Icon
          id={checked ? 'star' : 'star-outlined'}
          size={props.size}
          style={{
            color: (
              checked
                ? props.color.checked
                : props.color.unchecked
            ),
          }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      keyExtractor={(item) => String(item)}
    />
  );
};

StarRating.propTypes = {
  color: PropTypes.shape({
    checked: PropTypes.string.isRequired,
    unchecked: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  size: PropTypes.number,
  value: PropTypes.oneOf([1, 2, 3, 4, 5]),
};

StarRating.defaultProps = {
  readOnly: false,
  size: 30,
};

const styles = createStyle((theme) => ({
  separator: {
    width: theme.spacing(2.5),
  },
}));

export default StarRating;
