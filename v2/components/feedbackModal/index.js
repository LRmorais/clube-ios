import React, {useState, useRef} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
// import Clipboard from '@react-native-clipboard/clipboard';

import Box from '../box';
import PaddingContainer from '../paddingContainer';
import Spacer from '../spacer';
import CommonButton from '../button/common';
import createStyle from '../../utils/style';
import {SmallerButton} from '../SmallerButton';

import {theme} from '../../utils/style';

const FeedbackModal = props => {
  const [width, setWidth] = useState();
  const [scrollOffset, setScrollOffset] = useState(null);
  const scrollViewRef = useRef();
  const subtitleCopyable = props.copyable?.includes('subtitle');

  function handleContentLayout(e) {
    setWidth(e.nativeEvent.layout.width);
  }

  function handleScrollTo(e) {
    scrollViewRef.current.scrollTo(e);
  }

  function handleScroll(e) {
    setScrollOffset(e.nativeEvent.contentOffset.y);
  }

  function copy(text) {
    return function () {
      // Clipboard.setString(text);
    };
  }

  return (
    <Modal
      style={styles.modal}
      isVisible={props.visible}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      propagateSwipe={true}
      scrollOffsetMax={100}
      animationIn="fadeInUp"
      animationOut="fadeOutDown">
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        centerContent
        showsVerticalScrollIndicator
        overScrollMode="never"
        bounces={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <Box background="transparent">
          <PaddingContainer style={styles.innerContainer}>
            <PaddingContainer
              style={[
                styles.content,
                {backgroundColor: theme.palette.primary.contrast},
                // {backgroundColor: (props.color || {}).background},
                width ? {minHeight: width} : {aspectRatio: 1 / 1},
              ]}
              onLayout={handleContentLayout}>
              <Spacer size={4} fixedSize />
              {props.title && (
                <>
                  <Text
                    style={[
                      styles.title,
                      {color: theme.palette.primary.light},
                    ]}>
                    {/* style={[styles.title, {color: (props.color || {}).text}]}> */}
                    {props.title}
                  </Text>
                  <Spacer size={0.06} setMinSize />
                </>
              )}
              {props.subtitle && (
                <>
                  <TouchableOpacity
                    activeOpacity={subtitleCopyable ? 0.75 : 1}
                    onPress={
                      subtitleCopyable ? copy(props.subtitle) : undefined
                    }>
                    <Text
                      style={[
                        styles.subtitle,
                        {color: theme.palette.primary.light},
                        // {color: (props.color || {}).text},
                      ]}>
                      {props.subtitle}
                    </Text>
                  </TouchableOpacity>
                  <Spacer size={2} setMinSize />
                </>
              )}
              <View style={styles.descriptionAndExtraActionsContainer}>
                {props?.description &&
                typeof props?.description === 'object' ? (
                  <>
                    {props?.description.map((paragraph, index) => {
                      return (
                        <Text
                          key={index}
                          style={[
                            styles.description,
                            index !== 0 && styles.paragraph,
                            {color: theme.palette.primary.light},
                            props.extraStyles,
                            // {color: (props.color || {}).text},
                          ]}>
                          {paragraph}
                        </Text>
                      );
                    })}
                  </>
                ) : (
                  <Text
                    style={[
                      styles?.description,
                      {color: theme.palette.primary.light},
                      // {color: (props.color || {}).text},
                    ]}>
                    {props.description}
                  </Text>
                )}
                {props.extraActions && (
                  <View style={styles.extraActionsContainer}>
                    {props.extraActions.map((option, index) => (
                      <>
                        {props.description.length > 1 && index !== 0 && (
                          <Spacer key={index} size={1} fixedSize />
                        )}
                        <SmallerButton key={index} settings={option} />
                      </>
                    ))}
                  </View>
                )}
              </View>
              {props.action && (
                <>
                  <CommonButton
                    text={props.action.text.toUpperCase()}
                    textColor={theme.palette.primary.light}
                    // textColor={(props.color || {}).text}
                    // backgroundColor={(props.color || {}).button}
                    onPress={props.action.onPress}
                  />
                </>
              )}
              {props.actionDeleteAcount && (
                <>
                  <CommonButton
                    text={props.actionDeleteAcount.text.toUpperCase()}
                    textColor={theme.palette.primary.light}
                    // textColor={(props.color || {}).text}
                    // backgroundColor={(props.color || {}).button}
                    onPress={props.actionDeleteAcount.onPress}
                  />
                </>
              )}
              <Spacer size={4} fixedSize />
            </PaddingContainer>
          </PaddingContainer>
        </Box>
      </ScrollView>
    </Modal>
  );
};

FeedbackModal.propTypes = {
  action: PropTypes.shape({
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  }),
  color: PropTypes.shape({
    background: PropTypes.string,
    button: PropTypes.string,
    text: PropTypes.string,
  }),
  copyable: PropTypes.arrayOf(PropTypes.string.isRequired),
  // description: PropTypes.string,
  icon: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
};

const styles = createStyle(theme => ({
  modal: {
    margin: 0,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '82%',
    borderRadius: theme.spacing(1),
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(32),
    textAlign: 'center',
  },
  description: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
    textAlign: 'center',
    lineHeight: 21,
  },
  extraActionsContainer: {
    marginTop: 25,
    marginBottom: 10,
  },
  descriptionAndExtraActionsContainer: {
    flex: 1,
    paddingVertical: 15,
  },
  paragraph: {
    marginTop: 15,
  },
}));

export default FeedbackModal;
