import React from 'react';
import {decode} from 'html-entities';

import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import SimpleVerticalList from '../../../components/verticalList/simple';
import NewsListItem from '../../../components/listItem/especific_news';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const List = () => {
  const {theme} = useLayoutContext();
  const {
    data,
    goToNewsDetailsScreenHOF: handleListItemPressHOF,
    showNextPage: handleEndReached,
  } = useContext();
  const fakeData = [{id: -4}, {id: -5}, {id: -6}];

  function renderItem({item}) {
    if (item.id < 0) {
      return renderSkeleton(item);
    }

    return (
      <NewsListItem
        id={item.id}
        image={item.image}
        text={{
          primary: decode(item.title),
          secondary: item.resume,
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

  const finalData = [...data, ...fakeData];

  return (
    <Box>
      <PaddingContainer>
        <SimpleVerticalList
          data={finalData}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
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
