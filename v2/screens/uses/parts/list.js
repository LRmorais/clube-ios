import React from 'react';
import {FlatList} from 'react-native';
import moment from 'moment';

import Box from '../../../components/box';
import SimpleVerticalList from '../../../components/verticalList/simple';
import PaddingContainer from '../../../components/paddingContainer';
import PlaceListItem from '../../../components/listItem/place';
import {getDistance} from '../../../utils/map';
import {formatPrice} from '../../../utils/data';
import {ASSET_PREFIX} from '../../../constants/env';
import {useLayoutContext} from '../../../hocs/layout';
import {useGlobalStateContext} from '../../../hocs/globalState';
import {useContext} from '../context';

const List = () => {
  const {theme} = useLayoutContext();
  const {deviceLocation} = useGlobalStateContext();
  const {
    uses,
    payments,
    tab,
    goToEvaluationScreenHOF: handleListItemRatingPressHOF,
    goToPlaceDetailsScreenHOF,
    goToCheckoutScreenHOF,
  } = useContext();
  const data = {
    default: uses,
    payments: payments,
  }[tab];

  if (!data) {
    return null;
  }

  function getDateOrInfinity(date) {
    return date !== 'openPayments' ? Number(new Date(date)) : Infinity;
  }

  const sectionData = data.reduce((cumulative, current) => {
    let key =
      tab === 'payments' && current.situation === 1
        ? 'openPayments'
        : moment(current.createdAt).format('YYYY-MM-DD');
    return {
      ...cumulative,
      [key]: [...(cumulative[key] || []), current],
    };
  }, {});
  const sections = Object.keys(sectionData).sort(
    (one, another) => getDateOrInfinity(another) - getDateOrInfinity(one),
  );

  function renderItem({item}) {
    let place = item.PartnerUnit;
    // let place = generalData.unitsByID[item.partnerUnitId] || {
    //   ...item.PartnerUnit,
    //   partner: {},
    // };
    // console.log('place', place.fantasyName);
    let refundedPayment = item.discountedValue && item.situation === 4;
    let title = place.fantasyName + (refundedPayment ? ' [estornado]' : '');
    console.log('title:', title);
    let distance =
      deviceLocation &&
      place.latitude &&
      place.longitude &&
      getDistance(
        {
          lat: deviceLocation.coords.latitude,
          lng: deviceLocation.coords.longitude,
        },
        {
          lat: Number(place.latitude),
          lng: Number(place.longitude),
        },
        true,
      );
    // let isVIP =
    //   place.partner.partnerType === 2 || place.partner.partnerType === 3;
    // let rating =
    //   item.scoreClient ||
    //   (!refundedPayment &&
    //     generalData.unitsByID[item.partnerUnitId] && {
    //       action: handleListItemRatingPressHOF(item),
    //       text: 'Deixe sua avaliação',
    //     });
    let icons = [];
    if (item.discountedValue) {
      icons.push({
        icon: 'dollar',
        label: formatPrice(item.discountedValue, false),
        color: {
          icon: theme.primaryColor,
          label: theme.primaryColor,
        },
      });
    }
    // if (place.partner.discountAmount) {
    //   icons.push({
    //     icon: 'voucher',
    //     label: `${place.partner.discountAmount}%`,
    //     color: {
    //       icon: theme.primaryColor,
    //       label: theme.primaryColor,
    //     },
    //   });
    // }
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

    const handlePress = (
      item.discountedValue && item.situation === 1
        ? () => goToCheckoutScreenHOF(item)
        : () => goToPlaceDetailsScreenHOF(place)
    )();

    return (
      <PaddingContainer>
        <PlaceListItem
          id={place.id}
          color={{
            image: theme.secondColorShade,
            title: theme.tertiaryColor,
            rating: {
              action: theme.primaryColor,
              icon: theme.VIPBackground,
              text: theme.VIPBackground,
            },
          }}
          partnerName={title}
          distance={distance}
          image={ASSET_PREFIX + place.logo}
          // rating={rating || undefined}
          discountType={item.status || undefined}
          icons={icons}
          onPress={handlePress}
        />
      </PaddingContainer>
    );
  }

  function renderSection({item: date, index}) {
    let title =
      date === 'openPayments'
        ? 'Pagamentos em aberto'
        : moment(date).calendar(null, {
            sameDay: '[Hoje]',
            lastDay: '[Ontem]',
            lastWeek: 'dddd',
            sameElse: 'DD [de] MMMM',
          });

    return (
      <Box
        title={title}
        titleColor={theme.primaryColor}
        noGutters={sections.length - 1 < index && 'bottom'}>
        <SimpleVerticalList
          data={sectionData[date]}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          showSeparator
          separatorColor="transparent"
        />
      </Box>
    );
  }

  return (
    <FlatList
      data={sections}
      renderItem={renderSection}
      keyExtractor={item => item}
    />
  );
};

export default List;
