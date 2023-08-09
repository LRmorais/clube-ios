import React from 'react';
import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import SimpleVerticalList from '../../../components/verticalList/simple';
import PartnerList from '../../../components/listItem/partnerUnitList';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const List = () => {
  const {theme} = useLayoutContext();
  const {goToPartnerDetails, units} = useContext();

  function renderItem({item}) {
    return (
      <PartnerList
        id={item.id}
        text={{
          fantasyName: item.fantasyName,
          address: item.address,
          number: item.number,
          neighborhood: item.neighborhood,
          city: item.city,
          uf: item.uf,
          distance: item.distance,
        }}
        color={{
          primary: theme.primaryColor,
          secondary: theme.primaryColor,
        }}
        onPress={goToPartnerDetails(item)}
      />
    );
  }

  return (
    <Box background={theme.greyishBackground}>
      <PaddingContainer>
        <SimpleVerticalList
          data={units}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          onEndReachedThreshold={1}
          showSeparator
          separatorColor={theme.dividerColor}
        />
      </PaddingContainer>
    </Box>
  );
};

export default List;
