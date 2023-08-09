import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import moment from 'moment';
import 'moment/locale/pt-br';
import PropTypes from 'prop-types';

import CircleIcon, {sizes} from '../icons/circle';
import Icon from '../icons';
import ImageEmpty from '../imageEmpty';
import Carousel from '../carousel';
import MovieGridDay from './day';
import DatePicker from '../datePicker';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const MovieGrid = props => {
  const {screenHeight, headerBarHeight} = useLayoutContext();
  const [index, setIndex] = useState(0);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const canShowDatePicker = props.data.length > 1;

  function handleBackPress() {
    setIndex(index => index - 1);
  }

  function handleForwardPress() {
    setIndex(index => index + 1);
  }

  function showDatePicker() {
    setDatePickerVisible(true);
  }

  function handleDateChange(e, date) {
    setDatePickerVisible(false);
    if (!date) {
      return;
    }

    let chosen = moment(date);
    let index = props.data.findIndex(item => chosen.isSame(item.date, 'day'));
    if (index === -1) {
      return;
    }

    setIndex(index);
  }

  const statusBarHeight = {
    ios: getStatusBarHeight(),
    android: 0,
  }[Platform.OS];

  const emptyStyledIfNeeded = props.data[index].data.length === 0 && {
    height: screenHeight - headerBarHeight - statusBarHeight,
  };

  return (
    <View style={emptyStyledIfNeeded}>
      <View
        style={[
          styles.topBar,
          {backgroundColor: props.color.topBar.background},
        ]}>
        <View style={styles.arrowContainer}>
          {props.data[index - 1] && (
            <CircleIcon
              id="arrow-left"
              size="small"
              iconColor={props.color.topBar.text}
              backgroundColor="transparent"
              onPress={handleBackPress}
            />
          )}
        </View>
        {props.data[index] && (
          <TouchableOpacity
            style={[
              styles.dateContainer,
              {backgroundColor: props.color.topBar.dateContainer},
            ]}
            activeOpacity={canShowDatePicker ? 0.75 : 1}
            onPress={canShowDatePicker ? showDatePicker : undefined}>
            <Text style={[styles.date, {color: props.color.topBar.text}]}>
              {moment(props.data[index].date)
                .calendar(Date.now(), {
                  sameDay: '[Hoje]',
                  nextDay: '[Amanhã]',
                  nextWeek: 'dddd',
                  sameElse: 'DD/MM',
                })
                .toUpperCase()}
            </Text>
            {canShowDatePicker && (
              <Icon
                id="arrow-down"
                size={11}
                style={[styles.dateIcon, {color: props.color.topBar.text}]}
              />
            )}
            <DatePicker
              visible={datePickerVisible}
              mode="date"
              display="default"
              locale="pt-BR"
              value={moment(props.data[index].date).toDate()}
              minimumDate={moment(props.data[0].date).toDate()}
              maximumDate={moment(
                props.data[props.data.length - 1].date,
              ).toDate()}
              onChange={handleDateChange}
            />
          </TouchableOpacity>
        )}
        <View style={styles.arrowContainer}>
          {props.data[index + 1] && (
            <CircleIcon
              id="arrow-right"
              size="small"
              iconColor={props.color.topBar.text}
              backgroundColor="transparent"
              onPress={handleForwardPress}
            />
          )}
        </View>
      </View>
      {props.data[index].data.length === 0 && (
        <ImageEmpty
          backgroundColor={props.data[index].noSessionsProps.background}
          mainInfo={props.data[index].noSessionsProps}
          substractHeaderBar
          imageProps={{
            source: require('../../images/personas/noResults.png'),
            align: 'bottom',
          }}
        />
      )}
      {props.data[index].data.length !== 0 && (
        <Carousel
          data={props.data}
          renderItem={({item}) => <MovieGridDay {...item} />}
          keyExtractor={item => item.date}
          scrollEnabled={false}
          index={index}
          dots={false}
        />
      )}
    </View>
  );
};

MovieGrid.propTypes = {
  color: PropTypes.shape({
    topBar: PropTypes.shape({
      background: PropTypes.string.isRequired,
      dateContainer: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  data: PropTypes.array.isRequired,
  noSessionsProps: PropTypes.object.isRequired,
};

const styles = createStyle(theme => ({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing(1.5),
  },
  arrowContainer: {
    width: theme.spacing(sizes.small),
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(4.5),
  },
  date: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(21),
    textAlign: 'center',
  },
  dateIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default MovieGrid;
