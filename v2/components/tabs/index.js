import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';

import TabsItem from './item';
import createStyle from '../../utils/style';

const fontSizeEnum = ['medium', 'small'];

const Tabs = (props) => {
  const initialSelected = props.selected || props.defaultSelected || props.data[0].value;
  const [selected, setSelected] = useState(initialSelected);

  useEffect(() => {
    if (props.selected) setSelected(props.selected);
  }, [props.selected]);

  function renderItem({ item }) {
    function handlePress() {
      setSelected(item.value);
      props.onChange(item.value);
    }

    return (
      <TabsItem
        {...item}
        color={item.color || props.defaultColor}
        noTopGutter={!!props.bottomSpacing}
        stretch={props.fullSize}
        fontSize={item.fontSize || props.fontSize}
        selected={selected === item.value}
        onPress={handlePress}
      />
    );
  }

  return (
    <View style={[
      styles.outerContainer,
      { backgroundColor: props.backgroundColor },
    ]}>
      <FlatList
        contentContainerStyle={[
          styles.container,
          {
            small: styles.containerSmall,
            medium: styles.containerMedium,
          }[props.fontSize || fontSizeEnum.find((value) => props.data.some((item) => item.fontSize === value))],
          props.bottomSpacing && styles.bottomSpacing,
          !props.fullSize && styles.containerNotFullWidth,
        ]}
        horizontal
        showsHorizontalScrollIndicator
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
        CellRendererComponent={(itemProps) => (
          <View
            {...itemProps}
            style={[
              itemProps?.style,
              { flex: ~~props.fullSize },
            ]}
          />
        )}
        ItemSeparatorComponent={!props.noSpace && (() => (
          <View style={styles.separator} />
        ))}
      />
    </View>
  );
};

Tabs.propTypes = {
  backgroundColor: PropTypes.string,
  bottomSpacing: PropTypes.bool,
  data: PropTypes.array.isRequired,
  defaultColor: PropTypes.string,
  defaultSelected(props, propName, componentName) {
    const propType = typeof props[propName];
    if (propType === 'undefined') return;
    if (props.data.some((item) => item.value === props[propName])) return;
    return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`.');
  },
  fontSize: PropTypes.oneOf(fontSizeEnum),
  fullSize: PropTypes.bool,
  noSpace: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  selected(props, propName, componentName) {
    const propType = typeof props[propName];
    if (propType === 'undefined') return;
    if (props.data.some((item) => item.value === props[propName])) return;
    return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`.');
  },
};

Tabs.defaultProps = {
  bottomSpacing: false,
  fontSize: fontSizeEnum[0],
  fullSize: false,
  noSpace: false,
};

const styles = createStyle((theme) => ({
  outerContainer: {
    flex: 0,
  },
  container: {
    justifyContent: 'center',
    width: '100%',
  },
  containerSmall: {
    height: theme.spacing(6),
  },
  containerMedium: {
    height: theme.spacing(7),
  },
  bottomSpacing: {
    marginBottom: theme.spacing(2),
  },
  containerNotFullWidth: {
    paddingHorizontal: theme.spacing(3),
  },
  separator: {
    width: theme.spacing(5),
  },
}));

export default Tabs;
