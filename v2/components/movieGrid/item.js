import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import Spacer from '../spacer';
import FloatingButton from '../button/floating';
import SimpleVerticalList from '../verticalList/simple';
import MovieGridItemSession from './session';
import createStyle from '../../utils/style';

const MovieGridItem = props => {
  const [open, setOpen] = useState(false);

  function handlePurchasePress() {
    try {
      dispatchRecord('Abrir link de compra', {
        value: thing.purchaseInClubURL,
      });
      Linking.openURL(`${thing.purchaseInClubURL}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`);
    } catch {
      //
    }
  }

  function handleOpenPress() {
    setOpen(open => !open);
  }

  return (
    <>
      {props.place.title === '' ? (
        <></>
      ) : (
        <View
          style={[
            styles.container,
            props.first && styles.containerFirst,
            props.last && styles.containerLast,
          ]}>
          <TouchableOpacity
            style={[
              styles.placeContainer,
              !props.place.purchase && styles.placeContainerExtraMargin,
            ]}
            activeOpacity={props.place.onPress ? 0.75 : 1}
            onPress={props.place.onPress}>
            <Text style={[styles.place, {color: props.color.text.place}]}>
              {props.place.title.toUpperCase()}
            </Text>
            {props.place.purchase && (
              <View>
                <Spacer size={1.5} fixedSize />
                <FloatingButton
                  {...props.place.purchase}
                  textSize="small"
                  text={'Comprar\ningressos'}
                />
              </View>
            )}
          </TouchableOpacity>
          <View
            style={[styles.divider, {backgroundColor: props.color.divider}]}
          />
          <View style={styles.list}>
            <SimpleVerticalList
              showSeparator
              data={open ? props.sessions : props.sessions.slice(0, 1)}
              renderItem={({item}) => <MovieGridItemSession {...item} />}
              keyExtractor={item => item.time}
            />
          </View>
          {props.sessions.length > 1 && (
            <TouchableOpacity
              style={styles.moreContainer}
              activeOpacity={0.75}
              onPress={handleOpenPress}>
              <Text style={[styles.more, {color: props.color.text.more}]}>
                {open ? 'VER MENOS' : 'VER MAIS\nHORÁRIOS'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

MovieGridItem.propTypes = {
  color: PropTypes.shape({
    divider: PropTypes.string.isRequired,
    text: PropTypes.shape({
      more: PropTypes.string.isRequired,
      place: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  first: PropTypes.bool.isRequired,
  last: PropTypes.bool.isRequired,
  place: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    purchase: PropTypes.object,
  }).isRequired,
  sessions: PropTypes.array.isRequired,
};

const styles = createStyle(theme => ({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  containerFirst: {
    marginTop: theme.spacing(2),
  },
  containerLast: {
    marginBottom: theme.spacing(2),
  },
  placeContainer: {
    flex: 3,
    marginTop: theme.spacing(1),
  },
  placeContainerExtraMargin: {
    marginTop: theme.spacing(3),
  },
  place: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
  },
  divider: {
    width: 1,
    height: '100%',
    marginHorizontal: theme.spacing(3),
  },
  list: {
    flex: 4,
  },
  moreContainer: {
    position: 'absolute',
    padding: theme.spacing(1),
    top: theme.spacing(-2),
    right: theme.spacing(-1),
  },
  more: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(10),
    textDecorationLine: 'underline',
  },
}));

export default MovieGridItem;
