import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import ImageWithLoading from '../imageWithLoading';
import VerticalDate from '../verticalDate';
import createStyle, { theme } from '../../utils/style';
import ListLabeledIcons from '../icons/listLabeled';
import { useLayoutContext } from '../../hocs/layout';

const EventListItem = (props) => {
  const {
    screenWidth,
  } = useLayoutContext();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: screenWidth - theme.spacing(3 * 2),
          backgroundColor: props.color.containerBackground,
        },
      ]}
      activeOpacity={props._skeleton ? 1 : .75}
      onPress={props.onPress}
    >
      <ImageWithLoading
        containerStyle={[
          styles.image,
          { backgroundColor: props.color.image },
        ]}
        source={{ uri: props.image }}
      />
      <View style={styles.mainContent}>
        {props._skeleton && (
          <VerticalDate.Skeleton textColor={props.color.date} />
        )}
        {props.date && (
          <VerticalDate
            date={props.date}
            textColor={props.color.date}
          />
        )}
        <View style={styles.texts}>
          <Text style={[
            styles.textPrimary,
            { color: props.color.text.primary },
          ]}>
            {props.text.primary}
          </Text>
          {props.text.secondary && (
            <Text style={[
              styles.textSecondary,
              { color: props.color.text.secondary },
            ]}>
              {props.text.secondary}
            </Text>
          )}
        </View>
        {props.icons && (
          <ListLabeledIcons
            data={props.icons.map((data) => ({
              ...data,
              id: data.icon,
            }))}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

EventListItem.propTypes = {
  _skeleton: PropTypes.bool,
  color: PropTypes.shape({
    containerBackground: PropTypes.string.isRequired,
    date: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.shape({
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string,
    }).isRequired,
  }).isRequired,
  date: PropTypes.any,
  icons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  })),
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
  }),
};

EventListItem.defaultProps = {
  _skeleton: false,
};

EventListItem.Skeleton = (props) => (
  <EventListItem
    _skeleton
    color={props.color}
    id={props.id}
    image=""
    onPress={() => {}}
    text={{
      primary: '████████████',
      secondary: '██████████████████',
    }}
  />
);

const styles = createStyle((theme) => ({
  container: {
    overflow: 'hidden',
    paddingBottom: theme.spacing(2.5),
    borderRadius: 4,
  },
  image: {
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 2 / 1,
    resizeMode: 'cover',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2.5),
    paddingHorizontal: theme.spacing(3),
  },
  texts: {
    flex: 1,
    paddingHorizontal: theme.spacing(2),
  },
  textPrimary: {
    marginBottom: theme.spacing(.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  textSecondary: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
}));

export default EventListItem;
