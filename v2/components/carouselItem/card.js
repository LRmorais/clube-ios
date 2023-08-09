import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import PaddingContainer from '../paddingContainer';
import Box from '../box';
import ExtraVerticalPaddingContainer from '../paddingContainer/extraVertical';
import FloatingButton from '../button/floating';
import createStyle from '../../utils/style';

const CardCarouselItem = (props) => {
  const hasExtraComponents = props.floatingButtonProps || props.extraAction;

  return (
    <PaddingContainer>
      <View style={styles.container}>
        <Box background={props.background}>
          <PaddingContainer>
            <ExtraVerticalPaddingContainer style={styles.content}>
              <View>
                <Text style={[
                  styles.primary,
                  { color: props.color.primary },
                ]}>
                  {props.text.primary}
                </Text>
                <Text style={[
                  styles.secondary,
                  { color: props.color.secondary },
                ]}>
                  {props.text.secondary}
                </Text>
              </View>
              {hasExtraComponents && (
                <View style={styles.extraComponents}>
                  {props.floatingButtonProps && (
                    <View style={styles.extraComponentTopMargin}>
                      <FloatingButton {...props.floatingButtonProps} />
                    </View>
                  )}
                  {props.extraAction && (
                    <View style={styles.extraComponentTopMargin}>
                      <TouchableOpacity
                        style={styles.extraActionContainer}
                        activeOpacity={.75}
                        onPress={props.extraAction.onPress}
                      >
                        <Text style={[
                          styles.extraActionText,
                          { color: props.extraAction.color },
                        ]}>
                          {props.extraAction.text.toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </ExtraVerticalPaddingContainer>
          </PaddingContainer>
        </Box>
      </View>
    </PaddingContainer>
  );
};

CardCarouselItem.propTypes = {
  color: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }).isRequired,
  extraAction: PropTypes.shape({
    color: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  }),
  floatingButtonProps: PropTypes.object,
  text: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = createStyle((theme) => ({
  container: {
    overflow: 'hidden',
    borderRadius: theme.spacing(1),
  },
  content: {
    justifyContent: 'space-between',
  },
  primary: {
    marginBottom: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
    textAlign: 'center',
  },
  secondary : {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textAlign: 'center',
    lineHeight: 24.5,
  },
  extraComponents: {
    marginTop: theme.spacing(1),
  },
  extraComponentTopMargin: {
    marginTop: theme.spacing(3.5),
  },
  extraActionContainer: {
    alignSelf: 'center',
  },
  extraActionText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
}));

export default CardCarouselItem;
