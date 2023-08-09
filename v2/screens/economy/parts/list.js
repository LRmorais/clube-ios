import React from 'react';
import moment from 'moment';

import Box from '../../../components/box';
import SimpleVerticalList from '../../../components/verticalList/simple';
import PaddingContainer from '../../../components/paddingContainer';
import PlaceListItem from '../../../components/listItem/place';
import { ASSET_PREFIX } from '../../../constants/env';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const List = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
  } = useContext();

  if (data?.length === 0) return null;

  function getDateOrZero(date) {
    return Number(new Date(date)) || 0;
  }

  const sectionData = data.reduce((cumulative, current) => {
    let key = moment(current.updatedAt).format('YYYY-MM-DD');
    return {
      ...cumulative,
      [key]: [
        ...(cumulative[key] || []),
        current,
      ],
    };
  }, {});
  const sections = Object.keys(sectionData).sort((one, another) => (
    getDateOrZero(another) - getDateOrZero(one)
  ));

  function renderItem({ item }) {
    return (
      <PaddingContainer>
        <PlaceListItem
          id={item.CouponsBook.Partner.id}
          color={{
            image: theme.secondColorShade,
            title: theme.tertiaryColor,
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
          title={item.CouponsBook.Partner.fantasyName}
          image={ASSET_PREFIX + item.CouponsBook.Partner.logo}
        />
      </PaddingContainer>
    );
  }

  function renderSection({ item: date, index }) {
    let title = moment(date).calendar(null, {
      sameDay: '[Hoje]',
      lastDay: '[Ontem]',
      lastWeek: 'dddd',
      sameElse: 'DD [de] MMMM',
    });

    return (
      <Box
        title={title}
        titleColor={theme.primaryColor}
        noGutters={sections.length -1 < index && 'bottom'}
      >
        <SimpleVerticalList
          data={sectionData[date]}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          showSeparator
          separatorColor="transparent"
        />
      </Box>
    );
  }

  return (
    <SimpleVerticalList
      data={sections}
      renderItem={renderSection}
      keyExtractor={(item) => item}
    />
  );
};

export default List;
