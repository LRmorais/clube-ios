import React from 'react';
import {View} from 'react-native';
import MenuListe from '../../../components/menu';

import createStyle from '../../../utils/style';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Menu = () => {
  const {theme} = useLayoutContext();
  const {
    handleNotificationsPress,
    handleMovieTicketsPress,
    handleUsesPress,
    handleSettingsPress,
    handleRecommendToFriendsPress,
    handleRecommendEstablishmentPress,
    handleHelpCentrePress,
    handlePolicyAndPrivacyPress,
    pendingPayments,
    confirmDeleteAcount,
  } = useContext();
  return (
    <View style={styles.menuContainer}>
      <MenuListe
        items={[
          {
            color: theme.contrastTextColor,
            icon: 'bell',
            onPress: handleNotificationsPress,
            text: 'Notificações',
            badgeColor: {
              background: theme.red__main,
              text: theme.contrastTextColor,
            },
          },
          {
            color: theme.contrastTextColor,
            icon: 'ticket',
            onPress: handleMovieTicketsPress,
            text: 'Meus ingressos',
            badgeColor: {
              background: theme.red__main,
              text: theme.contrastTextColor,
            },
          },
          {
            color: theme.contrastTextColor,
            icon: 'voucher-outlined',
            onPress: handleUsesPress,
            text: 'Utilizações',
            badgeCount: pendingPayments,
            badgeColor: {
              background: theme.red__main,
              text: theme.contrastTextColor,
            },
          },
          {
            color: theme.contrastTextColor,
            icon: 'settings',
            onPress: handleSettingsPress,
            text: 'Configurações',
            badgeColor: {
              background: theme.red__main,
              text: theme.contrastTextColor,
            },
          },
          {
            color: theme.contrastTextColor,
            icon: 'person-more',
            onPress: handleRecommendToFriendsPress,
            text: 'Indique um amigo',
            badgeColor: {
              background: theme.red__main,
              text: theme.contrastTextColor,
            },
          },
          {
            color: theme.contrastTextColor,
            icon: 'establishment',
            onPress: handleRecommendEstablishmentPress,
            text: 'Indique um estabelecimento',
            badgeColor: {
              background: theme.red__main,
              text: theme.contrastTextColor,
            },
          },
          {
            color: theme.contrastTextColor,
            icon: 'help',
            onPress: handleHelpCentrePress,
            text: 'Central de ajuda',
            badgeColor: {
              background: theme.red__main,
              text: theme.contrastTextColor,
            },
          },
          {
            color: theme.contrastTextColor,
            icon: 'privacy',
            onPress: handlePolicyAndPrivacyPress,
            text: 'Termos de uso',
            badgeColor: {
              background: theme.red__main,
              text: theme.contrastTextColor,
            },
          },
          {
            color: theme.contrastTextColor,
            icon: 'user',
            onPress: confirmDeleteAcount,
            text: 'Excluir conta',
            badgeColor: {
              background: theme.red__main,
              text: theme.contrastTextColor,
            },
          },
        ]}
      />
    </View>
  );
};

const styles = createStyle(theme => ({
  menuContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '98%',
  },
}));

export default Menu;
