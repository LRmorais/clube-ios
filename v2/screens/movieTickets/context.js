import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useEffect,
} from 'react';

import GraphQL from '../../helpers/graphql';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useAnalyticsContext} from '../../hocs/analytics';
import {useAPIContext} from '../../hocs/api';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {userInfo} = useGlobalStateContext();
  const {dispatchRecord} = useAnalyticsContext();
  const {canCall} = useAPIContext();
  const [tickets, setTickets] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTickets();
  }, []);

  async function getTickets() {
    if (!canCall) {
      return setError('internet');
    }

    try {
      setLoading(true);
      let result = await GraphQL({
        query: `{
          movieTickets {
            id
            paidValue
            code
            sunday
            monday
            tuesday
            wednesday
            thursday
            friday
            saturday
            rules
            movieType
            orderDate
            validDate
            room
            roomType
            partner {
              id
              name
              logo
            }
          }
        }`,
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
      });
      if (result.status !== 200) {
        throw null;
      }

      setTickets(result.data.data.movieTickets);
    } catch {
      setError('any');
    } finally {
      setLoading(false);
    }
  }

  function hideError() {
    setError(false);
  }

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToDiscountResultHOF(item) {
    return function goToDiscountResult() {
      props.navigation.navigate('DiscountResult', {
        type: 'movieTicket',
        id: item.partner.id,
        data: item,
      });
    };
  }

  const value = {
    tickets,
    loading,
    error,
    hideError,
    returnToPreviousScreen,
    goToDiscountResultHOF,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
