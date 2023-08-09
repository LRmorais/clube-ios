import React from 'react';

import Accordion from '../../../components/accordion';
import HTMLRenderer from '../../../components/htmlRenderer';
import createStyle from '../../../utils/style';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Info = () => {
  const {theme} = useLayoutContext();
  const {data, sendLinkRecord: handleLinkPress} = useContext();

  const rulesContent = (
    <HTMLRenderer
      style={[styles.content, {color: theme.textPrimaryColor}]}
      onLinkPress={handleLinkPress}>
      {data.rules}
    </HTMLRenderer>
  );
  // const howItWorksContent = (
  //   <HTMLRenderer
  //     style={[
  //       styles.content,
  //       { color: theme.textPrimaryColor },
  //     ]}
  //     onLinkPress={handleLinkPress}
  //   >
  //     Texto de como funciona
  //   </HTMLRenderer>
  // );

  const rulesItem = {
    content: rulesContent,
    icon: 'info',
    title: 'Regras de uso',
    value: 'rules',
    color: {
      arrow: theme.secondColor,
      icon: theme.primaryColor,
      title: theme.primaryColor,
    },
  };
  // const howItWorksItem = {
  //   content: howItWorksContent,
  //   icon: 'help',
  //   title: 'Como funciona',
  //   value: 'howItWorks',
  //   color: {
  //     arrow: theme.secondColor,
  //     icon: theme.primaryColor,
  //     title: theme.primaryColor,
  //   },
  // };

  return (
    <Accordion
      data={[
        rulesItem,
        // howItWorksItem,
      ]}
      multiple
      defaultSelected={['rules']}
    />
  );
};

const styles = createStyle(theme => ({
  content: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: 20,
  },
}));

export default Info;
