import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const Interaction = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  function toggleCollapsed() {
    setCollapsed((collapsed) => !collapsed);
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: props.color.background + '66',
          borderColor: props.color.border + '66',
        },
      ]}
      activeOpacity={.75}
      onPress={toggleCollapsed}
    >
      {!props.hideAvatar && (
        <View style={[
          styles.imageContainer,
          { borderColor: props.color.border + '66' },
        ]}>
          <Image
            style={styles.image}
            source={require('../../images/personas/avatar.png')}
            resizeMode="cover"
          />
        </View>
      )}
      <Text
        style={[
          styles.text,
          { color: props.color.text },
        ]}
        numberOfLines={collapsed ? 3 : undefined}
      >
        {props.content}
      </Text>
    </TouchableOpacity>
  );
};

Interaction.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    border: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.string.isRequired,
  hideAvatar: PropTypes.bool,
};

Interaction.defaultProps = {
  hideAvatar: false,
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing(1.5),
    paddingHorizontal: theme.spacing(1),
    borderWidth: 1,
    borderRadius: 2,
  },
  imageContainer: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    borderWidth: 1,
    borderRadius: theme.spacing(2.25),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    flex: 1,
    paddingLeft: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: 16,
  },
}));

export default Interaction;
