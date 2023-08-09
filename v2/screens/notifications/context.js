import React, { createContext, useContext as useReactContext, useState } from 'react';

import API from '../../helpers/api';
import { useNotificationsContext } from '../../hocs/notifications';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    allNotifications,
  } = useNotificationsContext();
  const [loading, setLoading] = useState(false);
  const data = Object.values(allNotifications || {}).filter(({ title }) => !!title);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function checkNotificationHOF(data) {
    if (!data.url) return;

    return async function() {
      try {
        setLoading(true);
        let result = await API.call({
          method: 'get',
          url: `/api/checkUrl/check/${encodeURIComponent(data.url)}`,
        });
        setLoading(false);
        if (result.data.type === 'news') return props.navigation.navigate('NewsDetails', result.data.news);
        if (result.data.type === 'partnerUnit') return props.navigation.navigate('PlaceDetails', {
          id: result.data.id,
          data: {
            ...result.data.object,
            partner: result.data.object.Partner,
            Partner: undefined,
          },
        });
        Linking.openURL(`${data.url}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`);
      } catch {
        setLoading(false);
        Linking.openURL(`${data.url}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`);
        //
      }
    }
  }

  const value = {
    data,
    loading,
    returnToPreviousScreen,
    checkNotificationHOF,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
