import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

import ImageWithLoading from '../imageWithLoading';
import PaddingContainer from '../paddingContainer';
import VerticalDate from '../verticalDate';
import createStyle from '../../utils/style';
import ListLabeledIcons from '../icons/listLabeled';
import LabeledCheckboxGroup from '../labeledCheckbox/group';
import FloatingButton from '../button/floating';
import { useLayoutContext } from '../../hocs/layout';

const ChallengeListItem = (props) => {
  const [dateLayoutHeight, setDateLayoutHeight] = useState();
  const {
    screenWidth,
  } = useLayoutContext();

  function handleDateContainerLayout(e) {
    setDateLayoutHeight(e.nativeEvent.layout.height);
  }

  return (
    <TouchableOpacity
      activeOpacity={.75}
      onPress={props.onPress}
    >
      <ImageWithLoading
        containerStyle={[
          styles.image,
          { width: screenWidth },
        ]}
        source={{ uri: props.image }}
      />
      <View style={[
        styles.content,
        styles.outerContent,
      ]}>
        {props.date && (
          <PaddingContainer
            only="left"
            onLayout={handleDateContainerLayout}
          >
            <VerticalDate
              date={moment(props.date)}
              textColor={props.color.date}
            />
          </PaddingContainer>
        )}
        <PaddingContainer
          style={styles.middleContent}
          only="left"
        >
          <PaddingContainer only="right">
            <View style={[
              styles.content,
              styles.innerContent,
              { height: dateLayoutHeight },
            ]}>
              <Text style={[
                styles.title,
                { color: props.color.title },
              ]}>
                {props.text.title}
              </Text>
              {props.icons && (
                <View>
                  <ListLabeledIcons data={props.icons.map(
                    (data) => ({
                      ...data,
                      id: data.icon,
                    })
                  )} />
                </View>
              )}
            </View>
            {props.text.description && (
              <Text style={[
                styles.description,
                { color: props.color.description },
              ]}>
                {props.text.description}
              </Text>
            )}
            {props.action && (
              <View style={styles.actionContainer}>
                <FloatingButton {...props.action} />
              </View>
            )}
          </PaddingContainer>
          {props.tags && props.tags.length > 0 && (
            <LabeledCheckboxGroup data={props.tags} />
          )}
        </PaddingContainer>
      </View>
    </TouchableOpacity>
  );
};

ChallengeListItem.propTypes = {
  action: PropTypes.object,
  color: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  text: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = createStyle((theme) => ({
  image: {
    overflow: 'hidden',
    aspectRatio: 18 / 7,
    resizeMode: 'cover',
    marginBottom: theme.spacing(2.5),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outerContent: {
    alignItems: 'flex-start',
  },
  middleContent: {
    flex: 1,
  },
  innerContent: {
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
  },
  description: {
    marginTop: theme.spacing(1.5),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  actionContainer: {
    marginTop: theme.spacing(3),
  },
}));

export default ChallengeListItem;
