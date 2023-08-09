import React from 'react';
import {Text} from 'react-native';

import Box from '../../../../components/box';
import PaddingContainer from '../../../../components/paddingContainer';
import SimpleVerticalList from '../../../../components/verticalList/simple';
import PlaceListItem from '../../../../components/listItem/place';
import {getDistance} from '../../../../utils/map';
import createStyle from '../../../../utils/style';
import {ASSET_PREFIX} from '../../../../constants/env';
import {useLayoutContext} from '../../../../hocs/layout';
import {useGlobalStateContext} from '../../../../hocs/globalState';
import {useContext} from '../../context';

const List = () => {
  const {theme} = useLayoutContext();
  const {deviceLocation} = useGlobalStateContext();
  const {
    viewing,
    data,
    goToDiscountResultScreenHOF: handleListItemPressHOF,
  } = useContext();

  const title = {
    search: 'Resultados da busca',
    specific: 'Você estava vendo...',
    nearby: 'Locais próximos',
  }[viewing];

  function renderItem({item}) {
    let isVIP = item.partnerType === 2 || item.partnerType === 3;
    // let rating = (item.score || {}).scoreClient && Number((item.score || {}).scoreClient);
    let distance =
      deviceLocation &&
      item.latitude &&
      item.longitude &&
      getDistance(
        {
          lat: Number(item.latitude),
          lng: Number(item.longitude),
        },
        {
          lat: deviceLocation.coords.latitude,
          lng: deviceLocation.coords.longitude,
        },
        true,
      );

    let icons = [];
    if (item.discountAmount) {
      icons.push({
        icon: 'voucher',
        color: {
          icon: theme.primaryColor,
          label: theme.primaryColor,
        },
        label: `${item.discountAmount}%`,
      });
    }
    if (distance) {
      icons.push({
        icon: 'distance',
        color: {
          icon: theme.primaryColor,
          label: theme.primaryColor,
        },
        label: distance,
      });
    }

    return (
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
        isVIP={isVIP}
        title={item.fantasyName}
        image={ASSET_PREFIX + item.logo}
        // rating={rating || undefined}
        icons={icons}
        onPress={handleListItemPressHOF(item)}
      />
    );
  }

  return (
    <Box title={title} titleColor={theme.primaryColor}>
      <PaddingContainer>
        <SimpleVerticalList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          showSeparator
          separatorColor="transparent"
        />
        {data.length === 0 && (
          <Text style={[styles.noResults, {color: theme.textPrimaryColor}]}>
            Nenhum resultado
          </Text>
        )}
      </PaddingContainer>
    </Box>
  );
};

const styles = createStyle(theme => ({
  noResults: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
}));

export default List;
