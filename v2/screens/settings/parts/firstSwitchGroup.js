import React from 'react';

import MeaningfulSwitchGroup from '../../../components/meaningfulSwitch/group';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const FirstSwitchGroup = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    values,
    handleSwitchChangeHOF,
  } = useContext();

  const data = [
    {
      title: 'Localização',
      description: 'Utilizamos a sua localização para indicar os descontos mais próximos de você.',
      color: {
        title: theme.textPrimaryColor,
        description: theme.textPrimaryColor,
        thumb: theme.switchColor,
        track: theme.switchColor,
      },
      value: values.location || false,
      onChange: handleSwitchChangeHOF('location'),
    },
    {
      title: 'Geo-push',
      description: 'Receba notificações baseadas na sua localização, enquanto usa o app.\nPermissão de localização e notificações necessárias.',
      color: {
        title: theme.textPrimaryColor,
        description: theme.textPrimaryColor,
        thumb: theme.switchColor,
        track: theme.switchColor,
      },
      value: values.geopush || false,
      onChange: handleSwitchChangeHOF('geopush'),
    },
  ];

  return (
    <MeaningfulSwitchGroup data={data} />
  );
};

export default FirstSwitchGroup;
