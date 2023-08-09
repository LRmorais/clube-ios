import database from './database';

export default function getUserInfo() {
  return database
    .get('user-info')
    .then(JSON.parse)
    .catch(error => {
      console.log('erro no getUserInfo()');
      console.log(error);
    });
}
