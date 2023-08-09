import React, {useState, useRef, useEffect} from 'react';
import {View, Image, Platform} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import MapView, {Marker} from 'react-native-maps';
import PropTypes from 'prop-types';

import CircleIcon from '../../components/icons/circle';
import SelfMarker from '../../components/selfMarker';
import HorizontalList from '../../components/horizontalList';
import PlaceListItem from '../../components/listItem/place';

import createStyle, {theme as globalTheme} from '../../utils/style';
import {ASSET_PREFIX} from '../../constants/env';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useLayoutContext} from '../../hocs/layout';
import categoriesIcons from '../../defaults/categories.json';

const Maps = props => {
  const navigation = useNavigation();
  const {deviceLocation} = useGlobalStateContext();
  const {theme, screenWidth} = useLayoutContext();
  const mapRef = useRef();
  const onViewableItemsChanged = useRef(handleViewableItemsChanged);
  const listRef = useRef();

  const partnersData = props.data;

  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  if (!rendered) {
    return null;
  }

  function handlePartnerUnitPressHOF(data) {
    return function () {
      navigation.navigate({
        routeName: 'PartnerDetails',
        params: {
          id: data.id,
          unitId: data.id,
          from: {
            screenType: 'maps',
          },
        },
      });
      if (props.onPartnerUnitPress) {
        props.onPartnerUnitPress(data);
      }
    };
  }

  const initialCenter = deviceLocation
    ? deviceLocation.coords
    : {
        latitude: Number(partnersData[0].latitude),
        longitude: Number(partnersData[0].longitude),
      };

  function centerOnMap() {
    mapRef.current.animateCamera(
      {
        center: deviceLocation.coords,
      },
      {
        duration: 450,
      },
    );
  }

  function renderItem({item}) {
    return (
      <View
        style={[
          styles.listItem,
          {
            width: screenWidth - globalTheme.spacing(3 * 2),
            backgroundColor: theme.whiteBackground,
          },
        ]}>
        <PlaceListItem
          id={item.id}
          color={{
            image: theme.secondColorShade,
            title: theme.primaryColor,
            VIP: {
              background: theme.VIPBackground,
              icon: theme.primaryColorShade,
            },
            rating: {
              action: theme.primaryColor,
              icon: theme.VIPBackground,
              text: theme.VIPBackground,
            },
          }}
          partnerName={item.fantasyName}
          image={ASSET_PREFIX + item.logo}
          distance={item.distance}
          category={item.tag}
          discount={item.discountAmount}
          onPress={handlePartnerUnitPressHOF(item)}
        />
      </View>
    );
  }

  function handleViewableItemsChanged(info) {
    let {item} = info.changed[0];
    mapRef.current.animateCamera(
      {
        center: {
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        },
      },
      {
        duration: 450,
      },
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.maps}
        provider={Platform.OS === 'android' ? 'google' : null}
        rotateEnabled={false}
        moveOnMarkerPress={false}
        minZoomLevel={14}
        maxZoomLevel={19}
        initialCamera={{
          center: initialCenter,
          zoom: 15,
          pitch: 0,
          heading: 0,
          altitude: 0,
        }}>
        {partnersData?.map(unit => (
          <Marker
            key={unit.id}
            coordinate={{
              latitude: Number(unit.latitude),
              longitude: Number(unit.longitude),
            }}
            tracksViewChanges={false}
            onPress={handlePartnerUnitPressHOF(unit)}>
            <CircleIcon
              id={categoriesIcons[unit.category] || categoriesIcons.any}
              size="medium"
              backgroundColor={theme.primaryColor}
              iconColor={theme.contrastTextColor}
            />
          </Marker>
        ))}
        {deviceLocation && (
          <Marker style={styles.selfMarker} coordinate={deviceLocation.coords}>
            <SelfMarker
              color={{
                innerBall: theme.selfMarkerInner,
                innerBorder: theme.selfMarkerBorder,
                outerBall: theme.selfMarkerOuter,
              }}
            />
          </Marker>
        )}
      </MapView>
      {deviceLocation && (
        <View
          style={[
            styles.buttonContainer,
            {backgroundColor: theme.whiteBackground},
          ]}>
          <CircleIcon
            id="center-map"
            showShadow
            size="medium"
            iconColor={theme.tertiaryColor}
            backgroundColor={theme.whiteBackground}
            onPress={centerOnMap}
          />
        </View>
      )}
      <View style={styles.shadowContainer} pointerEvents="none">
        <Image
          source={require('../../images/vectors/overMapsShadow.png')}
          style={styles.shadow}
          resizeMode="stretch"
          pointer
        />
      </View>
      <View style={styles.listContainer}>
        <HorizontalList
          listRef={listRef}
          data={partnersData}
          renderItem={renderItem}
          keyExtractor={unit => String(unit.id)}
          //              total width   side gutters           separator
          snapToInterval={
            screenWidth - globalTheme.spacing(3 * 2) + globalTheme.spacing(1)
          }
          decelerationRate="fast"
          viewabilityConfig={{
            itemVisiblePercentThreshold: 70,
          }}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />
      </View>
    </View>
  );
};

Maps.propTypes = {
  // mapRef: ?
  onPartnerUnitPress: PropTypes.func,
  placesIDs: PropTypes.arrayOf(PropTypes.number),
};

const styles = createStyle(theme => ({
  container: {
    flex: 1,
    position: 'relative',
  },
  maps: {
    flex: 1,
  },
  selfMarker: {
    zIndex: 2,
  },
  buttonContainer: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(35),
    borderRadius: theme.spacing(3),
  },
  listContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: theme.spacing(10),
  },
  listItem: {
    marginVertical: theme.spacing(2),
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(1.5),
    ...theme.shadows[5],
  },
  shadowContainer: {
    position: 'absolute',
    width: '100%',
    height: 280,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shadow: {
    width: '100%',
    height: '100%',
  },
}));

export default Maps;
