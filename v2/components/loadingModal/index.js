import React from 'react';
import { Modal, View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import PropTypes from 'prop-types';

import Icon from '../icons';
import createStyle from '../../utils/style';

const LoadingModal = (props) => (
  <Modal
    visible={props.visible}
    animationType="fade"
    supportedOrientations={['portrait']}
    transparent
  >
    <View style={styles.container}>
      <AnimatableView
        animation="rubberBand"
        iterationCount="infinite"
        iterationDelay={350}
        duration={1250}
        isInteraction={false}
      >
        <Icon
          id="logo-capital"
          size={72}
          style={{ color: props.iconColor }}
        />
      </AnimatableView>
    </View>
  </Modal>
);

LoadingModal.propTypes = {
  iconColor: PropTypes.string,
  visible: PropTypes.bool.isRequired,
};

LoadingModal.defaultProps = {
  iconColor: 'white',
};

const styles = createStyle({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
});

export default LoadingModal;
