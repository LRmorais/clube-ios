import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import LabeledCheckbox from './index';
import createStyle from '../../utils/style';

const WrappedLabeledCheckboxGroup = (props) => {
  const hasHandler = !!props.onChange;

  function handleChange(value) {
    props.onChange(value, !props.value.includes(value));
  }

  function renderItem(item) {
    return (
      <View
        key={item.value}
        style={styles.itemContainer}
      >
        <LabeledCheckbox
          {...item}
          checked={props.value.includes(item.value)}
          onChange={hasHandler ? handleChange : undefined}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {props.data.map((item) => renderItem(item))}
    </View>
  );
};

WrappedLabeledCheckboxGroup.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])),
};

WrappedLabeledCheckboxGroup.defaultProps = {
  value: [],
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: theme.spacing(-1),
  },
  itemContainer: {
    margin: theme.spacing(1),
  },
}));

export default WrappedLabeledCheckboxGroup;
