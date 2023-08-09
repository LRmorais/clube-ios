import React from 'react';
import {View, Text, TextInput, Platform} from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import createStyle from '../../utils/style';

const FormInput = (props) => (
  <View>
    {props.label && (
      <Text
        style={[
          styles.label,
          {
            color:
              props.color.label || props.color.subtitle || props.color.label,
          },
        ]}>
        {props.label}
      </Text>
    )}
    <View style={styles.inputContainer}>
      <TextInput
        {...props}
        style={[
          styles.input,
          !props.multiline && styles.inputSingleLine,
          {
            color: props.color.text,
            backgroundColor: props.color.background,
            borderColor: props.feedback
              ? props.color.feedback[props.feedback.type]
              : props.color.background,
          },
          props.multiline &&
            Platform.OS === 'ios' && {
              minHeight: 29 + (props.numberOfLines || 1) * 14,
            },
        ]}
        ref={props.inputRef}
        textAlignVertical={props.multiline && 'top'}
        placeholderTextColor={props.color.text + '77'}
      />
      {props.feedback && (
        <View style={styles.feedback} pointerEvents="none">
          {props.feedback.message && (
            <Text
              style={[
                styles.feedbackMessage,
                {color: props.color.feedback[props.feedback.type]},
              ]}>
              {props.feedback.message}
            </Text>
          )}
          {props.feedback.icon && (
            <Icon
              id={props.feedback.icon}
              size={13}
              style={[
                styles.feedbackIcon,
                {color: props.color.feedback[props.feedback.type]},
              ]}
            />
          )}
        </View>
      )}
      {props.suffixIcon && !props.feedback && (
        <View style={styles.suffixIcon} pointerEvents="none">
          <Icon
            id={props.suffixIcon}
            size={22}
            style={{color: props.color.suffixIcon || props.color.text}}
          />
        </View>
      )}
    </View>
    {props.subtitle && (
      <Text
        style={[
          styles.subtitle,
          {
            color:
              props.color.subtitle || props.color.label || props.color.text,
          },
        ]}>
        {props.subtitle}
      </Text>
    )}
  </View>
);

FormInput.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    feedback: PropTypes.shape({
      error: PropTypes.string,
      success: PropTypes.string,
      warning: PropTypes.string,
    }),
    suffixIcon: PropTypes.string,
    label: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
  feedback: PropTypes.shape({
    icon: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.oneOf(['error', 'success', 'warning']).isRequired,
  }),
  label: PropTypes.string,
  subtitle: PropTypes.string,
  suffixIcon: PropTypes.string,
};

const styles = createStyle((theme) => ({
  label: {
    marginLeft: 5,
    marginBottom: theme.spacing(0.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.lineHeight.mostCommon,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    paddingHorizontal: theme.spacing(1.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    fontWeight: {
      // https://github.com/facebook/react-native/issues/18820#issuecomment-481693150
      ios: 'bold',
      android: 'normal',
    }[Platform.OS],
    borderWidth: 3,
    borderRadius: theme.spacing(1),
  },
  inputSingleLine: {
    height: theme.spacing(6),
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    right: 0,
    paddingRight: theme.spacing(2),
  },
  feedbackMessage: {
    fontFamily: theme.typography.fontFamily.regularItalic,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(10),
  },
  feedbackIcon: {
    marginLeft: theme.spacing(1),
  },
  subtitle: {
    marginTop: theme.spacing(0.5),
    fontFamily: theme.typography.fontFamily.regularItalic,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.lineHeight.mostCommon,
  },
  suffixIcon: {
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    right: theme.spacing(2),
  },
}));

export default FormInput;
