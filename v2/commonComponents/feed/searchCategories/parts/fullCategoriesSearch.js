import React from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {View} from 'react-native';

import Box from '../../../../components/box';
import HorizontalList from '../../../../components/verticalColumsList';
import CircleIcon from '../../../../components/icons/categoriesIcons';

import {theme as globalTheme} from '../../../../utils/style';
import {useGlobalStateContext} from '../../../../hocs/globalState';
import {useLayoutContext} from '../../../../hocs/layout';
import categoriesIcons from '../../../../defaults/categories.json';
import {useContext} from '../context';

const Categories = () => {
  const {data, updatePrevious, setData, originalData, setValueSearch} =
    useContext();
  const navigation = useNavigation();
  const {setVisibleModalCategories} = useGlobalStateContext();
  const {screenWidth, theme} = useLayoutContext();
  const visibleIcons = 3.1;
  const iconContainerWidth =
    (screenWidth - globalTheme.spacing(3 * 2)) /
    globalTheme.spacing(visibleIcons);

  function renderItem({item}) {
    function handlePress() {
      updatePrevious(item.name);
      setVisibleModalCategories(false);
      setData(originalData);
      setValueSearch('');
      navigation.navigate({
        routeName: 'Places',
        params: {
          type: 'category',
          title: item.name,
          slugCategory: item.slug,
        },
      });
    }

    return (
      <CircleIcon
        id={categoriesIcons[item.slug] || categoriesIcons.any}
        imageSource={item.uri}
        size="medium"
        containerWidth={iconContainerWidth}
        backgroundColor={theme.secondColorShade}
        iconColor={theme.primaryColor}
        label={{
          text: item.name,
          color: theme.textPrimaryColor,
        }}
        onPress={handlePress}
      />
    );
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <>
      <Box
        title="Categorias"
        titleColor={theme.primaryColor}
        shadow="none"
        noGutters="bottom">
        <HorizontalList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
        />
      </Box>
    </>
  );
};

export default Categories;
