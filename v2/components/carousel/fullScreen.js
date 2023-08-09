import React, {useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import ImageWithLoading from '../imageWithLoading';
import Carousel from './index';
import createStyle from '../../utils/style';

const FullScreenCarousel = (props) => {
  const [index, setIndex] = useState(props.index);

  function renderItem({item}) {
    if (!item.backgroundProps) {
      return null;
    }

    return (
      <ImageWithLoading
        {...item.backgroundProps}
        style={[styles.backgroundImage, item.backgroundProps.style]}
      />
    );
  }

  function handleScroll(index) {
    setIndex(index);
  }

  return (
    <View
      style={[
        styles.container,
        {
          top: styles.containerTop,
          center: styles.containerCenter,
          bottom: styles.containerBottom,
        }[props.contentPosition],
        {backgroundColor: props.backgroundColor},
      ]}>
      <View style={styles.backgroundContainer}>
        <Carousel
          {...props}
          dots={false}
          index={index}
          scrollEnabled={false}
          renderItem={renderItem}
        />
      </View>
      <View>
        <Carousel
          {...props}
          onScroll={handleScroll}
          CellRendererComponent={(cellProps) => (
            <View
              {...cellProps}
              style={[
                styles.cellRenderer,
                {
                  top: styles.containerTop,
                  center: styles.containerCenter,
                  bottom: styles.containerBottom,
                }[props.contentPosition],
              ]}
            />
          )}
        />
      </View>
    </View>
  );
};

FullScreenCarousel.propTypes = {
  backgroundColor: PropTypes.string,
  contentPosition: PropTypes.oneOf(['top', 'center', 'bottom']),
};

FullScreenCarousel.defaultProps = {
  contentPosition: 'center',
};

const styles = createStyle((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
    paddingVertical: theme.spacing(4),
  },
  containerTop: {
    justifyContent: 'flex-start',
  },
  containerCenter: {
    justifyContent: 'center',
  },
  containerBottom: {
    justifyContent: 'flex-end',
  },
  cellRenderer: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
}));

export default FullScreenCarousel;
