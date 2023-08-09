import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';

import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import SimpleVerticalList from '../../../components/verticalList/simple';
import NewsListItem from '../../../components/listItem/especific_news';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';
import { ASSET_PREFIX } from '../../../constants/env';

const List = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
    dataEnded,
    goToSpecificNewsDetailsScreenHOF: handleListItemPressHOF,
    showNextPage: handleEndReached,
  } = useContext();
  const fakeData = [{ id:-4 }, { id:-5 }, { id:-6 }];

  function renderItem({ item }) {
    if (item.id < 0) return renderSkeleton(item);

    return (
      <NewsListItem
        id={item.id}
        image={ASSET_PREFIX + item.image}
        text={{
          primary: item.title,
          secondary: moment(item.publishedDate || item.createdAt).format('DD [de] MMMM[,] YYYY'),
        }}
        color={{
          primary: theme.primaryColor,
          secondary: theme.primaryColor,
        }}
        onPress={handleListItemPressHOF(item)}
      />
    );
  }

  function renderSkeleton(item) {
    return (
      <NewsListItem.Skeleton
        id={item.id}
        color={{
          primary: theme.textPrimaryColor,
          secondary: theme.textPrimaryColor,
          image: theme.secondColorShade,
        }}
      />
    );
  }

  const finalData = (
    dataEnded
      ? data
      : [
        ...data,
        ...fakeData,
      ]
  );

  return (
    <Box>
      <PaddingContainer>
        <SimpleVerticalList
          data={finalData}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          onEndReached={handleEndReached}
          onEndReachedThreshold={1}
          showSeparator
          separatorColor={theme.dividerColor}
        />
      </PaddingContainer>
    </Box>
  );
};

export default List;
