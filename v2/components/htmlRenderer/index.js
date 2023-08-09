import React from 'react';
import { StyleSheet, Platform, Text } from 'react-native';
import HTMLView from 'react-native-htmlview';
import PropTypes from 'prop-types';

import { theme } from '../../utils/style';

const HTMLRenderer = (props) => {
  const baseFontStyle = StyleSheet.flatten(props?.style);
  const tagsStyles = makeTagsStyles(baseFontStyle);

  function renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.type === 'text' && !node.parent && !node.prev && !node.next) return (
      <Text key={index} style={tagsStyles.p}>
        {node.data}
      </Text>
    );

    if (node.name === 'li' && parent.name === 'ul') return (
      <Text key={index} style={tagsStyles.ul}>
        {'⁃ '}
        {defaultRenderer(node.children, parent)}
        {node.next && '\n'}
      </Text>
    );

    if (node.name === 'li' && parent.name === 'ol') {
      let actualIndex = parent.children
        .filter((child) => child.type === 'tag')
        .findIndex((child) => Object.is(child, node));
      let prefix = (
        !parent.parent || parent.parent.name !== 'ol'
          ? actualIndex + 1
          : 'abcdefghijklmnopqrstuvwxyz'.split('')[actualIndex] || 'z'
      );
      return (
        <Text key={index} style={tagsStyles.ol}>
          {prefix}{'. '}
          {defaultRenderer(node.children, parent)}
          {node.next && '\n'}
        </Text>
      );
    }
  }

  return (
    <HTMLView
      value={props.children
        .replace(/\s+/gm, ' ')
        .replace(/>\s+</gm, '><')
      }
      stylesheet={tagsStyles}
      addLineBreaks={false}
      bullet={'⁃'}
      renderNode={renderNode}
      onLinkPress={props.onLinkPress}
    />
  );
};

HTMLRenderer.propTypes = {
  children: PropTypes.string.isRequired,
  onLinkPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
};

const makeTagsStyles = (style) => ({
  div: {
    ...style,
    fontFamily: theme.typography.fontFamily.regular,
  },
  p: {
    ...style,
    fontFamily: theme.typography.fontFamily.regular,
    fontWeight: 'normal',
  },
  ol: {
    ...style,
    fontFamily: theme.typography.fontFamily.regular,
    fontWeight: 'normal',
  },
  ul: {
    ...style,
    fontFamily: theme.typography.fontFamily.regular,
    fontWeight: 'normal',
  },
  strong: {
    ...style,
    fontFamily: theme.typography.fontFamily.bold,
    fontWeight: {
      ios: 'bold',
      android: 'normal',
    }[Platform.OS],
  },
  b: {
    ...style,
    fontFamily: theme.typography.fontFamily.bold,
    fontWeight: {
      ios: 'bold',
      android: 'normal',
    }[Platform.OS],
  },
  a: {
    ...style,
    color: style.color,
    textDecorationLine: 'underline',
    textDecorationColor: style.color,
  },
  del: {
    ...style,
    textDecorationLine: 'line-through',
    textDecorationColor: style.color,
  },
  i: {
    ...style,
    fontFamily: theme.typography.fontFamily.regularItalic,
    fontStyle: 'normal',
  },
  u: {
    ...style,
    textDecorationLine: 'underline',
    textDecorationColor: style.color,
  },
});

export default HTMLRenderer;
