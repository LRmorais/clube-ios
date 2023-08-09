import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const ListDots = props => {
  return (
    <View
      style={[
        styles.container,
        props.autoStyle ? styles.containerAuto : styles.containerManual,
      ]}>
      {[...new Array(props.quantity)].map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            props.autoStyle && styles.dotAuto,
            {
              opacity: props.index === i ? 1 : 0.5,
              backgroundColor: props.color,
            },
          ]}
        />
      ))}
    </View>
  );
};

ListDots.propTypes = {
  autoStyle: PropTypes.bool,
  color: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

ListDots.defaultProps = {
  autoStyle: true,
};

const styles = createStyle(theme => ({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  containerAuto: {
    width: 200,
    marginTop: theme.spacing(3),
  },
  containerManual: {
    maxWidth: 200,
  },
  dot: {
    flex: 1,
    maxWidth: 30,
    height: 2,
    marginHorizontal: theme.spacing(0.5),
  },
  dotAuto: {
    marginTop: theme.spacing(1),
  },
}));

export default ListDots;
