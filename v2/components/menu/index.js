import React from 'react';
import {FlatList, TouchableOpacity, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import CircleBadge from '../badge/circle';
import Icon from '../icons';
import createStyle from '../../utils/style';

const Menu = props => {
  function renderItem({item}) {
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.75}
        onPress={item.onPress}>
        <View style={styles.itemIconContainer}>
          {item.badgeCount && item.badgeCount > 0 ? (
            <CircleBadge count={item.badgeCount} color={item.badgeColor} />
          ) : (
            item.icon && (
              <Icon id={item.icon} size={14} style={{color: item.color}} />
            )
          )}
        </View>
        <Text style={[styles.itemText, {color: item.color}]}>
          {item.text.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={props.items}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(_, i) => String(i)}
    />
  );
};

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      badgeColor: PropTypes.object,
      badgeCount: PropTypes.number,
      color: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onPress: PropTypes.func.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
};

const styles = createStyle(theme => ({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.spacing(5),
    height: theme.spacing(4),
    marginRight: theme.spacing(1.5),
  },
  itemText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  separator: {
    height: theme.spacing(1.5),
  },
}));

export default Menu;
