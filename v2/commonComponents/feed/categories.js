/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView, Animated, StyleSheet, Platform, Text } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import Box from '../../components/box';

import HorizontalList from '../../components/verticalColumsList';
import CircleIcon from '../../components/icons/categoriesIcons';

import { theme as globalTheme } from '../../utils/style';
import { useGlobalStateContext } from '../../hocs/globalState';
import { useLayoutContext } from '../../hocs/layout';
import categoriesIcons from '../../defaults/categories.json';

const Categories = () => {

  const navigation = useNavigation();
  const {
    visibleModalCategories,
    setVisibleModalCategories,
    setDisableScroll,
    deviceLocation,
  } = useGlobalStateContext();
  const { screenWidth, theme } = useLayoutContext();
  const visibleIcons = 3.1;
  const iconContainerWidth =
    (screenWidth - globalTheme.spacing(3 * 2)) /
    globalTheme.spacing(visibleIcons);

  const nearby = {
    id: '-1',
    name: 'Próximo de você',
    slug: 'academias',
    uri: require('../../images/categories/nearby.jpg'),
  };

  const categories = [
    {
      id: '1',
      name: 'Bares e Baladas',
      slug: 'bares-e-baladas',
      uri: require('../../images/categories/Bares.jpg'),
    },
    {
      id: '2',
      name: 'Restaurantes',
      slug: 'restaurantes',
      uri: require('../../images/categories/Restaurantes.png'),
    },
    {
      id: '3',
      name: 'Farmácias',
      slug: 'farmacias',
      uri: require('../../images/categories/Farmacias.jpg'),
    },
    {
      id: '4',
      name: 'Pizzarias',
      slug: 'pizzarias',
      uri: require('../../images/categories/Pizzaria.png'),
    },
    {
      id: '5',
      name: 'Beleza e Estética',
      slug: 'beleza',
      uri: require('../../images/categories/Beleza.jpg'),
    },
    {
      id: '6',
      name: 'Cinemas',
      slug: 'cinemas',
      uri: require('../../images/categories/Cinemas.jpg'),
    },
  ];

  const newData = deviceLocation ? ['nearby', ...categories] : categories;

  //-------------- arrastar para cima
  const [alignment] = useState(new Animated.Value(0));

  const actionSheetIntroopolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });
  const actionSheetStyle = {
    bottom: actionSheetIntroopolate,
  };

  function handleExtraActionPress() {
    setVisibleModalCategories(true);
  }

  function handlePressCategory(item) {

    let params = item === 'nearby' ? {
      type: 'nearby',
      title: 'Mais Próximos',
      slugCategory: '',
    } : {
      type: 'category',
      title: item.name,
      slugCategory: item.slug,
    }
    navigation.navigate({
      routeName: 'Places',
      params: params
    });

  }

  const data = newData;
  const firstRow = data.slice(0, 3);
  const secondRow = data.slice(3, 6);

  return (
    <>
        <View
          style={[{
            width: '100%',
            backgroundColor: theme.primaryColor,
            height: 40,
          }]}>
          <Animated.View style={[styles.containerModal, actionSheetStyle]}>

          </Animated.View>
        </View>

      <Box
        title="SUGESTÕES"
        titleColor={theme.primaryColor}
        shadow="none"
        noGutters="bottom"
        action={{
          text: 'Ver mais',
          color: theme.secondColor,
          onPress: handleExtraActionPress,
        }}>
        <View style={styles.container}>
          <View style={styles.row}>
            {firstRow.map((item) => {
              if (item !== 'nearby') {
                return (
                  <View key={item.id} style={styles.cell}>
                    <CircleIcon
                      id={categoriesIcons[item.slug] || categoriesIcons.any}
                      size="medium"
                      imageSource={item.uri}
                      containerWidth={iconContainerWidth}
                      backgroundColor={theme.secondColorShade}
                      iconColor={theme.primaryColor}
                      label={{
                        text: item.name,
                        color: theme.primaryColor,
                      }}
                      onPress={() => { handlePressCategory(item) }}
                    />
                  </View>
                )
              } else {
                return (
                  <View key={item} style={styles.cell}>
                    <CircleIcon
                      id={categoriesIcons[nearby.slug] || categoriesIcons.any}
                      size="medium"
                      imageSource={nearby.uri}
                      containerWidth={iconContainerWidth}
                      backgroundColor={theme.secondColorShade}
                      iconColor={theme.primaryColor}
                      label={{
                        text: nearby.name,
                        color: theme.primaryColor,
                      }}
                      onPress={() => { handlePressCategory(item) }}
                    />
                  </View>
                );
              }
            })}
          </View>
          <View style={styles.row}>
            {secondRow.map((item) => (
              <View key={item.id} style={styles.cell}>
                <CircleIcon
                  id={categoriesIcons[item.slug] || categoriesIcons.any}
                  size="medium"
                  imageSource={item.uri}
                  containerWidth={iconContainerWidth}
                  backgroundColor={theme.secondColorShade}
                  iconColor={theme.primaryColor}
                  label={{
                    text: item.name,
                    color: theme.primaryColor,
                  }}
                  onPress={() => { handlePressCategory(item) }}
                />
              </View>
            ))}
          </View>
        </View>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 25,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  grabber: {
    flexGrow: 1,
    marginTop: 10,
    width: 45,
    borderTopWidth: 4,
    borderTopColor: '#aaa',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  cell: {
    flex: 1,
    height: '100%',
    margin: 10,
    // backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Categories;
