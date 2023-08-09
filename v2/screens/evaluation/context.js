import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useEffect,
} from 'react';

import {CORE_URL} from '../../constants/env';
import axios from 'axios';

import API from '../../helpers/api';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useAPIContext} from '../../hocs/api';
import {useAnalyticsContext} from '../../hocs/analytics';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {userInfo, generalData, updateUserInfoFromRemote} =
    useGlobalStateContext();
  const {canCall} = useAPIContext();
  const {dispatchRecord} = useAnalyticsContext();
  const evaluationTags = Object.values(generalData.evaluationTagsByID);
  const [rating, setRating] = useState(
    props.navigation.getParam('preset') || undefined,
  );
  const [tags, setTags] = useState([]);
  const [publicComment, setPublicComment] = useState('');
  const [privateComment, setPrivateComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [noInternet, setNoInternet] = useState(false);
  const placeId = props.navigation.getParam('placeId');
  const evaluationId = props.navigation.getParam('evaluationId');
  const [place, setPlace] = useState([]);

  const evaluationTagsByRating = evaluationTags.reduce(
    (cumulative, current) => ({
      ...cumulative,
      [current.score]: [...(cumulative[current.score] || []), current],
    }),
    {},
  );

  // buscando na api do core -------
  useEffect(() => {
    if (placeId) {
      getPartnerUnit();
    }
  }, [placeId]);
  async function getPartnerUnit() {
    let base_url = '';
    try {
      base_url = `${CORE_URL}partnerApp/unit/${placeId}`;
      const response = await axios.get(`${base_url}`);
      setPlace(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  }
  // ---------------------------------
  useEffect(() => {
    if (!rating) {
      return;
    }

    dispatchRecord('Número de estrelas', {
      value: rating,
    });
  }, [rating]);

  useEffect(() => {
    if (!rating) {
      return;
    }

    dispatchRecord('Tags selecionadas', {
      json: tags,
    });
  }, [tags]);

  function goToHomeScreen() {
    props.navigation.replace('Home');
  }

  async function sendEvaluation() {
    try {
      setLoading(true);
      await API.call({
        method: 'post',
        url: '/api/repository/qrCodeValidation/write',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
        data: {
          validationId: evaluationId,
          publicComment,
          privateComment,
          scoreClient: rating,
          ClientGazetaValidationsTagsUsed: tags,
        },
      });
      updateUserInfoFromRemote();
      goToHomeScreen();
      setLoading(false);
    } catch {
      setLoading(false);
      if (!canCall) {
        setNoInternet(true);
      }
    }
  }

  const value = {
    rating,
    setRating,
    tags,
    setTags,
    publicComment,
    setPublicComment,
    privateComment,
    setPrivateComment,
    loading,
    noInternet,
    place,
    evaluationTagsByRating,
    goToHomeScreen,
    sendEvaluation,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
