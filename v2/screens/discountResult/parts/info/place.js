import React from 'react';

import PlaceListItem from '../../../../components/listItem/place';
import Spacer from '../../../../components/spacer';
import {getDistance} from '../../../../utils/map';
import {ASSET_PREFIX} from '../../../../constants/env';
import {useLayoutContext} from '../../../../hocs/layout';
import {useGlobalStateContext} from '../../../../hocs/globalState';
import {useContext} from '../../context';

const PlaceInfo = () => {
  const {theme} = useLayoutContext();
  const {deviceLocation} = useGlobalStateContext();
  const {thing: place, evaluationId} = useContext();
  console.log('dentro do place', place);
  const distance =
    deviceLocation &&
    place.latitude &&
    place.longitude &&
    getDistance(
      {
        lat: deviceLocation.coords.latitude,
        lng: deviceLocation.coords.longitude,
      },
      {
        lat: Number(place?.latitude),
        lng: Number(place?.longitude),
      },
      true,
    );
  const isVIP = place?.partnerType === 2 || place?.partnerType === 3;
  const rating =
    (place?.score || {}).scoreClient &&
    Number((place?.score || {}).scoreClient);
  const icons = [];
  if (place?.discountAmount) {
    icons.push({
      icon: 'voucher',
      label: `${place?.discountAmount}%`,
      color: {
        icon: theme.primaryColor,
        label: theme.primaryColor,
      },
    });
  }
  if (distance) {
    icons.push({
      icon: 'distance',
      label: distance,
      color: {
        icon: theme.primaryColor,
        label: theme.primaryColor,
      },
    });
  }

  return (
    <>
      <PlaceListItem
        id={place.unitId}
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
        isVIP={isVIP}
        partnerName={place?.fantasyName}
        image={ASSET_PREFIX + place?.logo}
        rating={rating || undefined}
        icons={icons}
        distance={place.distance}
      />
      <Spacer size={3} fixedSize setMinSize />
    </>
  );
};

export default PlaceInfo;
