import database from '../helpers/database';

const getDataKeys = (what) => () => database.keys().then((keys) => {
  let includeRegex = new RegExp(`^${what}-\\d+$`, 'i');
  return keys.filter((key) => includeRegex.test(key));
});
export const getEventsKeys = getDataKeys('event');
export const getGuidesKeys = getDataKeys('guide');
export const getMomentsKeys = getDataKeys('moment');
export const getMoviesKeys = getDataKeys('movie');
export const getPartnersKeys = getDataKeys('partner');
export const getChallengesKeys = getDataKeys('challenge');
