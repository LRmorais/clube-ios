import React from 'react';

import ListLabeledIcons from '../../../components/icons/listLabeled';
import Spacer from '../../../components/spacer';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Contact = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
    contactPressHOF: handlePressHOF,
  } = useContext();

  const items = [];
  if (data.site) items.push({
    id: 'link',
    label: 'Site',
    color: {
      icon: theme.secondColor,
      label: theme.primaryColor,
    },
    onPress: handlePressHOF(data.site, 'Site'),
  });
  if (data.whatsapp) items.push({
    id: 'whatsapp',
    label: 'Whatsapp',
    color: {
      icon: theme.secondColor,
      label: theme.primaryColor,
    },
    onPress: handlePressHOF(`https://wa.me/55${data.whatsapp}`, 'WhatsApp'),
  });
  if (data.facebook) items.push({
    id: 'facebook',
    label: 'Facebook',
    color: {
      icon: theme.secondColor,
      label: theme.primaryColor,
    },
    onPress: handlePressHOF(data.facebook, 'Facebook'),
  });
  if (data.instagram) items.push({
    id: 'instagram',
    label: 'Instagram',
    color: {
      icon: theme.secondColor,
      label: theme.primaryColor,
    },
    onPress: handlePressHOF(data.instagram, 'Instagram'),
  });

  if (items.length === 0) return null;

  return (
    <>
      <Spacer size={5} fixedSize />
      <ListLabeledIcons
        data={items}
        size="bigSpecial"
        evenlySpaced
      />
    </>
  );
};

export default Contact;
