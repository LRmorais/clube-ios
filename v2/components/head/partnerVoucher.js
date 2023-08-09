import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import Box from '../box';
import PaddingContainer from '../paddingContainer';
import ImageWithLoading from '../imageWithLoading';
import ReadMore from '../readMore';
import CommonButton from '../button/common';
import createStyle from '../../utils/style';

const PartnerVoucherHead = (props) => (
  <Box background={props.color.background}>
    <PaddingContainer style={styles.container}>
      <ImageWithLoading
        style={styles.image}
        containerStyle={styles.imageContainer}
        source={{ uri: props.image }}
      />
      <Text style={[
        styles.title,
        { color: props.color.text },
      ]}>
        {props.text.title}
      </Text>
      {props.meta && (
        <Text style={[
          styles.meta,
          { color: props.meta.color || props.color.text },
        ]}>
          {props.meta.text}
        </Text>
      )}
      {props.text.description ? (
        <ReadMore
          containerProps={{
            style: styles.descriptionContainer,
          }}
          collapsedStyle={[
            styles.description,
            styles.collapsedDescription,
            { color: props.color.text },
          ]}
          expandedStyle={[
            styles.description,
            { color: props.color.text },
          ]}
          numberOfLines={3}
          onLinkPress={props.onLinkPress}
          renderExpandCaller={(handlePress) => (
            <View style={styles.descriptionButton}>
              <CommonButton
                text="Ler mais"
                backgroundColor={props.color.description.background}
                textColor={props.color.description.text}
                size="small"
                onPress={handlePress}
              />
            </View>
          )}
          renderCollapseCaller={(handlePress) => (
            <View style={styles.descriptionButton}>
              <CommonButton
                text="Ler menos"
                backgroundColor={props.color.description.background}
                textColor={props.color.description.text}
                size="small"
                onPress={handlePress}
              />
            </View>
          )}
        >
          {props.text.description}
        </ReadMore>
      ) : null}
    </PaddingContainer>
  </Box>
);

PartnerVoucherHead.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    description: PropTypes.shape({
      background: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
  }),
  onLinkPress: PropTypes.func,
  text: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = createStyle((theme) => ({
  container: {
    position: 'relative',
  },
  imageContainer: {
    alignSelf: 'center',
    width: '100%',
    aspectRatio: 11 / 5,
    marginBottom: theme.spacing(3),
  },
  image: {
    borderRadius: 2,
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(21),
    textAlign: 'center',
  },
  meta: {
    marginTop: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(13),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(18),
    textAlign: 'center',
  },
  descriptionContainer: {
    marginTop: theme.spacing(2.5),
  },
  description: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textAlign: 'center',
    lineHeight: 25,
  },
  collapsedDescription: {
    fontFamily: theme.typography.fontFamily.regular,
  },
  descriptionButton: {
    alignSelf: 'center',
    marginTop: theme.spacing(2),
  },
}));

export default PartnerVoucherHead;
