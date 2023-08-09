import React from 'react';

import Tabs from '../../../components/tabs';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const TypeTabs = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    tab: selected,
    setTab: handleChange,
    pendingPayments,
  } = useContext();

  return (
    <Tabs
      data={[
        {
          icon: 'menu',
          value: 'default',
          fontSize: 'small',
        },
        {
          icon: 'dollar',
          value: 'payments',
          fontSize: 'medium',
          badge: pendingPayments ? {
            count: pendingPayments,
            align: 'top',
            size: 'small',
            color: {
              background: theme.red__main,
              text: theme.contrastTextColor,
            },
          } : undefined,
        },
      ]}
      selected={selected}
      onChange={handleChange}
      fullSize
      defaultColor={theme.primaryColor}
      backgroundColor={theme.secondColorShade}
      noSpace
    />
  );
};

export default TypeTabs;
