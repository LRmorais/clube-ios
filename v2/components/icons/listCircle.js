import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import PropTypes from 'prop-types';

import CircleIcon from './circle';
import createStyle from '../../utils/style';

const ListCircle = props => {
  const [containerWidth, setContainerWidth] = useState(props.containerWidth);

  function handleContainerLayout(e) {
    if (props.containerWidth) {
      return;
    }

    setContainerWidth(e.nativeEvent.layout.width);
  }

  function renderItem({item}) {
    const Component = props.skeleton ? CircleIcon.Skeleton : CircleIcon;

    return (
      <View
        style={[
          styles.iconContainer,
          props.evenlySpaced && {width: containerWidth / props.data.length},
        ]}>
        <Component {...item} size={props.size} />
      </View>
    );
  }

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      horizontal
      onLayout={handleContainerLayout}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      keyExtractor={(_, i) => String(i)}
      ItemSeparatorComponent={
        !props.evenlySpaced && (() => <View style={styles.separator} />)
      }
      scrollEnabled={!props.skeleton}
    />
  );
};

ListCircle.propTypes = {
  containerWidth: PropTypes.number,
  data: PropTypes.array.isRequired,
  evenlySpaced: PropTypes.bool,
  skeleton: PropTypes.bool,
};

ListCircle.defaultProps = {
  evenlySpaced: false,
  skeleton: false,
};

const styles = createStyle(theme => ({
  iconContainer: {
    paddingHorizontal: theme.spacing(0.25),
  },
  separator: {
    width: theme.spacing(1),
  },
}));

export default ListCircle;
