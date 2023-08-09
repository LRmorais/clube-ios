import React from 'react';
import { FlatList } from 'react-native';
import moment from 'moment';

import Box from '../../../components/box';
import SimpleVerticalList from '../../../components/verticalList/simple';
import PaddingContainer from '../../../components/paddingContainer';
import NotificationListItem from '../../../components/listItem/notification';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const List = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
    checkNotificationHOF: handleItemPressHOF,
  } = useContext();

  if (!data || data.length === 0) return null;

  const sectionData = data.reduce((cumulative, current) => {
    let key = moment(current.createdAt).format('YYYY-MM-DD');
    return {
      ...cumulative,
      [key]: [
        ...(cumulative[key] || []),
        current,
      ],
    };
  }, {});
  const sections = Object.keys(sectionData).sort((one, another) => (
    new Date(another) - new Date(one)
  ));

  function renderItem({ item, index }) {
    return (
      <PaddingContainer>
        <NotificationListItem
          id={index}
          color={{
            image: theme.secondColorShade,
            primary: theme.primaryColor,
            secondary: theme.primaryColor,
          }}
          text={{
            primary: item.title,
            secondary: item.body,
          }}
          image={item.imageUrl}
          onPress={handleItemPressHOF(item)}
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
          keyExtractor={(_, index) => String(index)}
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
      keyExtractor={(item) => item}
    />
  );
};

export default List;
