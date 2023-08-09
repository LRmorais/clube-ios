import React from 'react';

import PlaceComplexListItem from '../../../components/listItem/placeComplex';
import SimpleVerticalList from '../../../components/verticalList/simple';
import {getDistance} from '../../../utils/map';
import {
  getMainTag,
  getCurrentDiscount,
  timesInPlace,
} from '../../../utils/data';
import {ASSET_PREFIX} from '../../../constants/env';
import {useLayoutContext} from '../../../hocs/layout';
import {useGlobalStateContext} from '../../../hocs/globalState';
import {useContext} from '../context';

const List = () => {
  const {theme} = useLayoutContext();
  const {userInfo} = useGlobalStateContext();
  const {
    controlledDeviceLocation,
    viewMode,
    screenType,
    previousScreenInfo,
    filteredData,
    goToPlaceDetailsScreenHOF: handlePlacePressHOF,
    headerPropsByScreenType: propsByScreenType,
    partnersData,
  } = useContext();

  // function getShadowByIndex(index) {
  //   let isFirst = index === 0;
  //   let isLast = index === filteredData.length - 1;
  //   let isUnique = isFirst && isLast;
  //   if (isUnique) {
  //     if (screenType === 'guide') {
  //       return 'none';
  //     }
  //     return 'bottom';
  //   }
  //   if (isFirst) {
  //     return 'bottom';
  //   }
  //   if (isLast) {
  //     if (screenType === 'guide') {
  //       return 'top';
  //     }
  //     return 'both';
  //   }
  //   return 'both';
  // }

  function renderItem({item, index}) {
    // var arr = item.rating;

    // var soma = 0;
    // for (var i = 0; i < arr.length; i++) {
    //   soma += arr[i];
    // }
    // var media = soma / arr.length;

    // let isVIP =
    //   item.partner.partnerType === 2 || item.partner.partnerType === 3;
    // let images = item.PartnerUnitImagens.filter(
    //   ({image, userTypeSendImage}) => !!image && userTypeSendImage === 1,
    // )
    //   .map(({image}) => ASSET_PREFIX + image)
    //   .slice(0, 1); // temp fix

    // let distance =
    //   controlledDeviceLocation &&
    //   getDistance(
    //     {
    //       lat: Number(item.latitude),
    //       lng: Number(item.longitude),
    //     },
    //     {
    //       lat: controlledDeviceLocation.coords.latitude,
    //       lng: controlledDeviceLocation.coords.longitude,
    //     },
    //     true,
    //   );
    // let mainTag = getMainTag(item.partner.PartnerTags);
    // let discountNow = getCurrentDiscount(item.PartnerUnityOpeningHours);
    // let timesHere = timesInPlace(item.partner.id, item.id, userInfo);
    // let rating =
    //   (item.score || {}).scoreClient && Number((item.score || {}).scoreClient);

    // let icons = [];
    // if (item.partner.discountAmount) {
    //   icons.push({
    //     icon: 'voucher',
    //     color: {
    //       icon: theme.primaryColor,
    //       label: theme.primaryColor,
    //     },
    //     // label: item.partner.discountAmount + '%',
    //     label:
    //       propsByScreenType.title === 'Cinemas'
    //         ? `Até ${item.partner.discountAmount}%`
    //         : item.partner.discountAmount + '%',
    //   });
    // }
    // if (distance) {
    //   icons.push({
    //     icon: 'distance',
    //     color: {
    //       icon: theme.primaryColor,
    //       label: theme.primaryColor,
    //     },
    //     label: distance,
    //   });
    // }

    // let descriptions = [];
    // if (mainTag) {
    //   descriptions.push(mainTag.name);
    // }
    // if (discountNow) {
    //   descriptions.push(
    //     `Desconto agora - até às ${discountNow.format('HH[h]mm')}`,
    //   );
    // }
    // if (timesHere) {
    //   descriptions.push(
    //     `Você já esteve aqui ${timesHere} ${timesHere === 1 ? 'vez' : 'vezes'}`,
    //   );
    // }

    // let interaction = {
    //   [screenType]: () => {},
    //   guide: () => ({
    //     content: previousScreenInfo.ScriptPartnerLists.find(
    //       ({partnerUnitId}) => partnerUnitId === item.id,
    //     ).description,
    //     color: {
    //       background: theme.secondColorShade,
    //       border: theme.primaryColor,
    //       text: theme.primaryColor,
    //     },
    //   }),
    // }[screenType]();

    return (
      <PlaceComplexListItem
        id={item.id}
        // shadow={getShadowByIndex(index)}
        color={{
          image: theme.secondColorShade,
          images: {
            background: theme.secondColorShade,
            icon: theme.primaryColor,
          },
          title: theme.tertiaryColor,
          VIP: {
            background: theme.VIPBackground,
            icon: theme.primaryColorShade,
          },
          rating: {
            icon: theme.VIPBackground,
            text: theme.VIPBackground,
            action: theme.primaryColor,
          },
        }}
        partnerName={item.fantasyName}
        distance={item.distance}
        category={item.tag}
        tag={item.category}
        discount={item.discountAmount}
        // rating={media}
        image={ASSET_PREFIX + item.logo}
        // isVIP={isVIP}
        // title={item.fantasyName}
        // image={ASSET_PREFIX + item.partner.logo}
        // images={images}
        // rating={rating || undefined}
        // icons={icons}
        // descriptions={descriptions}
        // interaction={interaction || undefined}
        onPress={handlePlacePressHOF(item)}
      />
    );
  }

  if (viewMode !== 'list') {
    return null;
  }

  return (
    <SimpleVerticalList
      data={partnersData}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      showSeparator
      separatorSize={1.5}
    />
  );
};

export default List;
