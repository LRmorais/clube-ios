import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import Button from '../button';

import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const FilterList = props => {
  const {theme} = useLayoutContext();

  function OrderByOptions(item) {
    const buttonStyle = props.orderBy.includes(item.order)
      ? styles.buttonSelected
      : styles.buttonDisabled;
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 90,
          width: 90,
        }}>
        <TouchableOpacity
          onPress={() => props.handleOrder(item.order)}
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              width: 65,
              height: 65,
              borderRadius: 10,
            },
            buttonStyle,
            ,
          ]}>
          <Icon name={item.iconName} size={20} />
        </TouchableOpacity>
        <Text>{item.title}</Text>
      </View>
    );
  }

  function createRows(data, columns) {
    const rows = Math.floor(data.length / columns); // [A]
    let lastRowElements = data.length - rows * columns; // [B]
    while (lastRowElements !== columns) {
      // [C]
      data.push({
        // [D]
        id: `empty-${lastRowElements}`,
        name: `empty-${lastRowElements}`,
        empty: true,
      });
      lastRowElements += 1; // [E]
    }
    return data; // [F]
  }

  const addFilterItem = e => {
    props.handleFilters([...props.selectedFilters, e]);
  };
  const removeFilterItem = item => {
    props.handleFilters(props.selectedFilters.filter(e => e !== item));
  };

  function handleItem(item) {
    props.selectedFilters.includes(item)
      ? removeFilterItem(item)
      : addFilterItem(item);
  }

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <OrderByOptions
          title="Padrão"
          order="alphabetical"
          iconName="swap-vertical-outline"
        />
        <OrderByOptions
          title="Distância"
          order="distance"
          iconName="navigate-outline"
        />
        {/* <OrderByOptions
          title="Avaliação"
          order="rating"
          iconName="star-outline"
        /> */}
        {/* <OrderByOptions
          title="Preço"
          iconName="exchange"
          order="price"
          icon="FontAwesome5"
        /> */}
      </View>

      <View style={{marginVertical: 20}}>
        <Text style={[styles.filterTitle, {color: props.color}]}>FILTROS</Text>

        <FlatList
          style={{height: 300}}
          data={createRows(props.data, 3)}
          keyExtractor={item => item.slug}
          numColumns={3}
          renderItem={({item}) => {
            if (item.empty) {
              return <View />;
            }
            const buttonStyle = props.selectedFilters.includes(item.slug)
              ? styles.buttonSelected
              : styles.buttonDisabled;
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.item, buttonStyle]}
                onPress={() => handleItem(item.slug)}>
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />

        <Button
          text="Aplicar Filtros"
          size="medium"
          backgroundColor={theme.primaryColor}
          textColor={theme.contrastTextColor}
          onPress={() => {
            props.aply();
            props.onClose();
          }}
        />
      </View>
    </View>
  );
};

const styles = createStyle(theme => ({
  buttonSelected: {
    backgroundColor: '#ffc133',
  },
  buttonDisabled: {
    backgroundColor: '#f7f7f7',
  },
  filterTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  item: {
    justifyContent: 'center',
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#ffc133',
    flexGrow: 1,
    marginHorizontal: 5,
    padding: 8,
    flexBasis: 0,
    borderRadius: 50,
  },
  itemEmpty: {
    backgroundColor: 'transparent',
  },
}));

export default FilterList;
