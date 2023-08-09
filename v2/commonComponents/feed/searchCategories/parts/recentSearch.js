import React from 'react';
import {View, Text, FlatList, Touchable, TouchableOpacity} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';

import Box from '../../../../components/box';

import Icon from 'react-native-vector-icons/FontAwesome';

import {useLayoutContext} from '../../../../hocs/layout';
import {useContext} from '../context';

const Categories = () => {
  const {previous, handleChange, setValueSearch} = useContext();
  const {theme} = useLayoutContext();

  const Item = ({title}) => (
    <View
      style={{
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
      }}>
      <Icon
        style={{marginRight: 10, marginLeft: 10}}
        color="#919191"
        name="history"
        size={20}
      />
      <Text style={{color: '#919191'}}>{title}</Text>
    </View>
  );

  const renderItemFake = ({item}) => (
    <>
      <TouchableOpacity
        onPress={() => {
          handleChange(item);
          setValueSearch(item);
        }}>
        <View>
          <Item title={item} />
        </View>
      </TouchableOpacity>
    </>
  );

  // -------------------

  return (
    <>
      <Box
        title="Buscas Recentes"
        titleColor={theme.primaryColor}
        shadow="none"
        noGutters="bottom">
        <FlatList
          data={previous}
          renderItem={renderItemFake}
          keyExtractor={item => item.id}
        />
      </Box>
    </>
  );
};

export default Categories;
