import React from 'react';
import { Platform, Modal, TouchableWithoutFeedback, View } from 'react-native';
import RNDatePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const DatePicker = (props) => {
  function handleClose() {
    props.onChange(null, props.value);
  }

  if (Platform.OS === 'android') {
    if (!props.visible) return null;

    return (
      <RNDatePicker {...props} />
    );
  }

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent
      presentationStyle="overFullScreen"
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.innerContainer}>
          <RNDatePicker
            {...props}
            style={styles.picker}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

DatePicker.propTypes = {
  visible: PropTypes.bool,
};

DatePicker.defaultProps = {
  visible: false,
};

const styles = createStyle({
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  picker: {
    width: '100%',
  },
});

export default DatePicker;
