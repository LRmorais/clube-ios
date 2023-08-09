import React from 'react';

import MeaningfulSwitchGroup from '../../../components/meaningfulSwitch/group';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const SecondSwitchGroup = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    values,
    handleSwitchChangeHOF,
  } = useContext();

  const data = [
    {
      title: 'Notificações',
      description: 'Receba alertas de notificações do app do Clube Gazeta do Povo.',
      color: {
        title: theme.textPrimaryColor,
        description: theme.textPrimaryColor,
        thumb: theme.switchColor,
        track: theme.switchColor,
      },
      value: values.notification || false,
      onChange: handleSwitchChangeHOF('notification'),
    },
  ];

  return (
    <MeaningfulSwitchGroup data={data} />
  );
};

export default SecondSwitchGroup;
