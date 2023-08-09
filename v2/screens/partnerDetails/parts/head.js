import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PartnerHead from '../../../components/head/partner';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';
import {ASSET_PREFIX} from '../../../constants/env';
import GoIcon from 'react-native-vector-icons/FontAwesome5';
import createStyle from '../../../utils/style';

const Head = props => {
  const {theme} = useLayoutContext();
  const {unit, sendLinkRecord: handleLinkPress, goUnitsList} = useContext();

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          padding: 20,
          alignItems: 'center',
        }}>
        <Text style={[styles.unitText, {color: theme.primaryColor}]}>
          UNIDADES:
        </Text>

        <TouchableOpacity
          onPress={goUnitsList}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            width: '65%',
            justifyContent: 'flex-end',
          }}>
          <View>
            <Text style={[styles.unitTextName, {color: theme.primaryColor}]}>
              {unit.neighborhood}
            </Text>
          </View>

          <GoIcon name={'chevron-right'} size={20} color={theme.primaryColor} />
        </TouchableOpacity>
      </View>
      <PartnerHead
        color={{
          background: theme.whiteBackground,
          text: theme.primaryColor,
          description: {
            background: '#ffc133',
            text: theme.primaryColor,
          },
        }}
        images={[ASSET_PREFIX + unit.logo]}
        text={{
          title: unit.fantasyName,
          description: unit.description,
          distance: unit.distance,
          slug: unit.tag,
        }}
        social={{
          facebook: unit.facebook,
          instagram: unit.instagram,
          whatsapp: unit.whatsapp,
          contactPhone: unit.contactPhone,
          site: unit.site,
        }}
        onLinkPress={handleLinkPress}
        purchaseURL={unit.purchaseInClubURL}
      />
      {/* <Address /> */}
    </>
  );
};

const styles = createStyle(theme => ({
  unitText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  unitTextName: {
    marginRight: 8,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
  },
  meta: {
    marginTop: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(11),
    textAlign: 'center',
  },
}));

export default Head;
