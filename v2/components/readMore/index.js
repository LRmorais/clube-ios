import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {stripHtml} from 'string-strip-html';
import PropTypes from 'prop-types';

import HTMLRenderer from '../htmlRenderer';

const ReadMore = props => {
  const [collapsed, setCollapsed] = useState(props.defaultCollapsed);
  const [insideBounds, setInsideBounds] = useState(false);

  function handleCollapsedLayout(e) {
    let numberOfLinesRendered = {
      android: e.nativeEvent.lines?.length,
      ios: (lines => {
        let linesExceptLast = lines.slice(0, lines.length - 1);
        let linesCharactersCount = linesExceptLast
          .map(line => line.text.length)
          .reduce((cumulative, current) => (cumulative += current), 0);
        let average = linesCharactersCount / linesExceptLast?.length;
        let lastLineRepresentationCount = Math.round(
          lines[lines?.length - 1].text?.length / average,
        );
        return lastLineRepresentationCount + linesExceptLast.length;
      })(e.nativeEvent.lines),
    }[Platform.OS];
    if (numberOfLinesRendered > props.numberOfLines) {
      return;
    }

    setCollapsed(false);
    setInsideBounds(true);
  }

  const Collapsed = (
    <Text
      style={props.collapsedStyle}
      numberOfLines={props.numberOfLines}
      onTextLayout={handleCollapsedLayout}>
      {stripHtml(props.children).result}
    </Text>
  );

  const Expanded = (
    <HTMLRenderer style={props.expandedStyle} onLinkPress={props.onLinkPress}>
      {props.children}
    </HTMLRenderer>
  );

  const Component = collapsed ? Collapsed : Expanded;

  function collapse() {
    setCollapsed(true);
  }

  function expand() {
    setCollapsed(false);
  }

  const CollapseCaller = props.renderCollapseCaller(collapse);
  const ExpandCaller = props.renderExpandCaller(expand);

  const Caller = collapsed ? ExpandCaller : CollapseCaller;

  return (
    <View {...props.containerProps}>
      {Component}
      {!insideBounds && Caller}
    </View>
  );
};

ReadMore.propTypes = {
  children: PropTypes.string.isRequired,
  collapsedStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  containerProps: PropTypes.object,
  defaultCollapsed: PropTypes.bool,
  expandedStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  numberOfLines: PropTypes.number.isRequired,
  onLinkPress: PropTypes.func,
  renderCollapseCaller: PropTypes.func.isRequired,
  renderExpandCaller: PropTypes.func.isRequired,
};

ReadMore.defaultProps = {
  collapsedStyle: {},
  containerProps: {},
  defaultCollapsed: true,
  expandedStyle: {},
};

export default ReadMore;
