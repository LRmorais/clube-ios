import React, { Fragment, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import LabeledIcon from './labeled';
import createStyle from '../../utils/style';

const ListLabeled = (props) => {
  const [containerWidth, setContainerWidth] = useState(0);

  function handleContainerLayout(e) {
    setContainerWidth(e.nativeEvent.layout.width);
  }

  function renderItem(item) {
    return (
      <View style={[
        styles.iconContainer,
        props.evenlySpaced && (
          { width: containerWidth / props.data.length }
        ),
      ]}>
        <LabeledIcon
          {...item}
          size={props.size}
          horizontal={props.horizontal}
        />
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      onLayout={handleContainerLayout}
    >
      {props.data.map((item, i) => (
        <Fragment key={String(i)}>
          {i !== 0 && (
            <View style={!props.evenlySpaced && (
              props.extraSpace
                ? styles.separatorExtra
                : styles.separator
            )} />
          )}
          {renderItem(item)}
        </Fragment>
      ))}
    </View>
  );
};

ListLabeled.propTypes = {
  data: PropTypes.array.isRequired,
  evenlySpaced: PropTypes.bool,
  extraSpace: PropTypes.bool,
  size: PropTypes.string,
};

ListLabeled.defaultProps = {
  evenlySpaced: false,
  extraSpace: false,
  size: 'small',
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: theme.spacing(.25),
  },
  separatorExtra: {
    width: theme.spacing(4),
  },
  separator: {
    width: theme.spacing(2),
  },
}));

export default ListLabeled;
