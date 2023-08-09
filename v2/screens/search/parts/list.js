import React from 'react';
import {View, SectionList, Text, StyleSheet} from 'react-native';
import {decode} from 'html-entities';

import Box from '../../../components/box';
import SimpleVerticalList from '../../../components/verticalList/simple';
import VerticalSectionList from '../../../components/verticalSectionList/index';
import PaddingContainer from '../../../components/paddingContainer';
import SearchListItem from '../../../components/listItem/searchList';
import {ASSET_PREFIX} from '../../../constants/env';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';
import NoResults from './noResults';
import createStyle from '../../../utils/style';
import moment from 'moment';
import 'moment/locale/pt-br';
import NewsListItem from '../../../components/listItem/news';

const Places = () => {
  const {theme} = useLayoutContext();
  const {
    noResults,
    partners,
    events,
    noticias,
    searchValue,
    goToPlaceDetailsScreenHOF: handleListItemPressHOF,
  } = useContext();
  // console.log(data);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eafffe',
    },
    taskTitle: {
      color: theme.primaryColor,
      fontSize: 20,
      fontWeight: 'bold',
      padding: 10,
      margin: 10,
      marginBottom: 5,
    },
  });

  function renderItem({item}) {
    console.log('render', item);
    return (
      <PaddingContainer>
        <SearchListItem
          type={item.type}
          id={item.id}
          date={item?.date}
          nameEvent={item?.name}
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
          price={item.minPrice}
          partnerName={item.fantasyName}
          distance={item.distance}
          category={item.slug}
          discount={item.discountAmount}
          // rating={media}
          image={ASSET_PREFIX + item.logo}
          newsImage={item.image}
          titleNews={decode(item.title)}
          dateNews={moment(item.scheduled).format('DD [de] MMMM[,] YYYY')}
          title={item.fantasyName}
          onPress={handleListItemPressHOF(item)}
        />
      </PaddingContainer>
    );
  }
  // function renderItem({item}) {
  //   return (
  //     <NewsListItem
  //       id={item.id}
  //       image={item.image}
  //       text={{
  //         primary: item.title,
  //         secondary: moment(item.scheduled).format('DD [de] MMMM[,] YYYY'),
  //       }}
  //       color={{
  //         primary: theme.tertiaryColor,
  //         secondary: theme.tertiaryColor,
  //         image: theme.secondColorShade,
  //       }}
  //       onPress={handleListItemPressHOF(item)}
  //     />
  //   );
  // }

  return (
    <>
      {noResults || searchValue == '' ? (
        <View style={{flex: 1, height: 750}}>
          <NoResults />
        </View>
      ) : (
        <VerticalSectionList
          sections={[...partners, ...events, ...noticias]}
          renderItem={renderItem}
          renderSectionHeader={({section}) => (
            <Text style={styles.taskTitle}>{section.title}</Text>
          )}
          keyExtractor={item => item.id}
          stickySectionHeadersEnabled
          showSeparator
          separatorSize={1.5}
        />
      )}
    </>
  );
};

export default Places;
