import React from 'react';

import Accordion from '../../../components/accordion';
import HTMLRenderer from '../../../components/htmlRenderer';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import content from '../../../defaults/helpQ&A.json';

const Content = () => {
  const {
    theme,
  } = useLayoutContext();

  const itemContent = (text) => (
    <HTMLRenderer style={[
      styles.itemContent,
      { color: theme.textPrimaryColor },
    ]}>
      {text}
    </HTMLRenderer>
  );

  const data = content.map((item) => ({
    color: {
      title: theme.primaryColor,
      arrow: theme.secondColor,
    },
    value: String(item.id),
    title: item.title,
    content: itemContent(item.content),
  }));

  return (
    <Accordion
      data={data}
      multiple
    />
  );
};

const styles = createStyle((theme) => ({
  itemContent: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: 21,
  },
}));

export default Content;
