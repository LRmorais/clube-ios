import React from 'react';
import Checkbox from '@react-native-community/checkbox';
import {useContext} from '../context';
import {TouchableOpacity} from 'react-native';
import {Platform} from 'react-native';

const CheckBoxTerms = () => {
  const {
    screenPalette,
    isTermsCheckbox: value,
    toggleCheckTerms,
  } = useContext();

  if (Platform === 'ios') {
    return (
      <Checkbox
        value={value}
        onAnimationType={'fill'}
        offAnimationType={'fill'}
        boxType={'square'}
        onCheckColor={screenPalette.sign_up_button.main}
        tintColors={{
          true: screenPalette.sign_up_button.main,
          false: '#f2f2f2',
        }}
        onTouchStart={toggleCheckTerms}
      />
    );
  } else {
    return (
      <Checkbox
        value={value}
        onCheckColor={screenPalette.sign_up_button.main}
        tintColors={{
          true: screenPalette.sign_up_button.main,
          false: '#f2f2f2',
        }}
        onValueChange={toggleCheckTerms}
      />
    );
  }
};

export default CheckBoxTerms;
