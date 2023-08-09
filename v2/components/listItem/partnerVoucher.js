import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import PlaceListItem from './place';
import ImageWithLoading from '../imageWithLoading';
import PaddingContainer from '../paddingContainer';
import FloatingButton from '../button/floating';
import createStyle from '../../utils/style';

const PartnerVoucherListItem = (props) => (
  <TouchableOpacity
    activeOpacity={props.onPress ? .75 : 1}
    onPress={props.onPress}
  >
    {!props._skeleton && (
      <PlaceListItem {...props.placeProps} />
    )}
    {props._skeleton && (
      <PlaceListItem.Skeleton {...props.placeProps} />
    )}
    <ImageWithLoading
      style={[
        styles.image,
        { opacity: props.status ? .5 : 1 },
      ]}
      containerStyle={[
        styles.imageContainer,
        { backgroundColor: props.color.image },
      ]}
      source={{ uri: props.image }}
    >
      {props.status && (
        <PaddingContainer>
          <FloatingButton
            colors={{
              main: props.color.status.background,
              shadow: 'transparent',
              text: props.color.status.text,
            }}
            text={props.status.text}
            textSize="small"
            icon={props.status.icon}
            stretch={false}
          />
        </PaddingContainer>
      )}
    </ImageWithLoading>
    <Text style={[
      styles.title,
      { color: props.color.text },
    ]}>
      {props.text.title}
    </Text>
    {(props.text.availableQuantity && props.text.availableDescription) || props.text.validDateMessage ? (
      <Text style={[
        styles.info,
        { color: props.color.text },
      ]}>
        <Text style={styles.bold}>
          {props._skeleton ? '███' : props.text.availableQuantity}
        </Text>
        {' '}
        {props.text.availableDescription}
        {' '}
        <Text style={styles.bold}>
          {props.text.validDateMessage}
        </Text>
      </Text>
    ) : null}
  </TouchableOpacity>
);

PartnerVoucherListItem.propTypes = {
  color: PropTypes.shape({
    image: PropTypes.string,
    status: PropTypes.shape({
      background: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    text: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  placeProps: PropTypes.shape(PlaceListItem.propTypes).isRequired,
  status: PropTypes.shape({
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
  }),
  text: PropTypes.shape({
    availableDescription: PropTypes.string,
    availableQuantity: PropTypes.number,
    title: PropTypes.string.isRequired,
    validDateMessage: PropTypes.string.isRequired,
  }).isRequired,
};

PartnerVoucherListItem.Skeleton = (props) => (
  <PartnerVoucherListItem
    _skeleton
    text={{
      availableDescription: '█████████',
      availableQuantity: 0,
      title: '████ █████████████ ████████',
      validDateMessage: '███ ██████',
    }}
    placeProps={props.placeProps}
    image=""
    color={props.color}
  />
);

const styles = createStyle((theme) => ({
  image: {
    borderRadius: theme.spacing(.5),
  },
  imageContainer: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    aspectRatio: 11 / 5,
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(.5),
  },
  title: {
    marginTop: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(18),
  },
  info: {
    marginTop: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(13),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(16),
    textAlign: 'center',
  },
  bold: {
    fontFamily: theme.typography.fontFamily.bold,
  },
}));

export default PartnerVoucherListItem;
