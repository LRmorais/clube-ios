import moment from 'moment';
import 'moment/locale/pt-br';

import {dedup} from './array';

const trailingCharacters = '_';
export const maskDoc = (input = '') => {
  let value = input.replace(/\D/g, '');
  if (value.length === 0) {
    return '';
  }

  value = value.padEnd(11, trailingCharacters);
  let output = `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(
    6,
    3,
  )}-${value.substr(9, 2)}`;
  let result = output.split(trailingCharacters)[0].replace(/\D$/g, '');
  return result;
};
export const maskCardValidity = (input = '') => {
  let value = input.replace(/\D/g, '');
  if (value.length === 0) {
    return '';
  }

  value = value.padEnd(6, trailingCharacters);
  let output = `${value.substr(0, 2)}/${value.substr(2, 2)}`;
  let result = output.split(trailingCharacters)[0].replace(/\D$/g, '');
  return result;
};
export const maskCardNumber = (input = '') => {
  let value = input.replace(/\D/g, '');
  if (value.length === 0) {
    return '';
  }

  value = value.padEnd(16, trailingCharacters);
  let output = `${value.substr(0, 4)} ${value.substr(4, 4)} ${value.substr(
    8,
    4,
  )} ${value.substr(12, 4)}`;
  let result = output.split(trailingCharacters)[0].replace(/\D$/g, '');
  return result;
};
export const maskPhone = (input = '') => {
  let value = input.replace(/\D/g, '');
  if (value.length === 0) {
    return '';
  }

  return value
    .replace(/^(\d{2})/, '($1) ')
    .replace(/(\d{5})(\d{4})$/, '$1-$2')
    .replace(/(\d{4})(\d+)$/, '$1-$2');
};
export const maskBirthday = (input = '') => {
  let value = input.replace(/\D/g, '');
  if (value.length === 0) {
    return '';
  }

  let {day, month, year} = value.match(
    /(?<day>\d{0,2})(?<month>\d{0,2})(?<year>\d{0,4})/,
  ).groups;
  return [day, month, year].filter(Boolean).join('/');
};
export const checkEmail = (input = '') =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    input,
  );
export const checkDoc = (input = '') => {
  let value = input.replace(/\D/g, '');
  if (value.length !== 11) {
    return false;
  }

  let invalidDocs = [...new Array(10)].map((_, i) => i.toString().repeat(11));
  if (invalidDocs.includes(value)) {
    return false;
  }

  function getDigit(v) {
    let digit =
      (v
        .split('')
        .reduce(
          (next, current, i, array) =>
            (next += current * (array.length + 1 - i)),
          0,
        ) *
        10) %
      11;
    return {
      [digit]: digit,
      10: 0,
      11: 0,
    }[digit];
  }

  let firstDigit = Number(value.substr(-2, 1));
  let secondDigit = Number(value.substr(-1, 1));
  if (firstDigit !== getDigit(value.substr(0, 9))) {
    return false;
  }
  if (secondDigit !== getDigit(value.substr(0, 10))) {
    return false;
  }

  return true;
};
export const checkBirthday = (input = '') =>
  moment(input, 'DD/MM/YYYY').isValid();
export const checkPassword = (input = '') => /^[\w!@#$*+-]{8,16}$/.test(input);
export const checkPhone = (input = '') =>
  /^\(?\d{2}\)? ?\d{4,5}-?\d{4}$/.test(input);
export const checkCardHolder = (input = '') => /^[\d\w -]+$/.test(input);
export const checkCardNumber = (input = '') => /^\d{13,19}$/.test(input);
export const checkCardValidity = (input = '') =>
  /^(0[1-9]|1[0-2])\/?[2-9]\d$/.test(input);
export const checkCardCvc = (input = '') => /^\d{3,4}$/.test(input);
export const checkPostalCode = (input = '') => /^\d{5}-?\d{3}$/.test(input);
export const checkAddressNumber = (input = '') => /^\d*$/.test(input);
export const checkAddressStreet = (input = '') =>
  /^[\dA-Za-zÀ-ÖØ-öø-ÿ -]+$/.test(input);
export const checkAddressCity = (input = '') =>
  /^[\dA-Za-zÀ-ÖØ-öø-ÿ -]+$/.test(input);
export const checkAddressState = (input = '') => /^[A-Z]{2}$/.test(input);
export const getCardBanner = input => {
  let cardNumber = input.replace(/\D/g, '');
  let cards = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})/,
    Master: /^5[1-5][0-9]{14}/,
    Diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
    Amex: /^3[47][0-9]{13}/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
    Hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
    Elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
    Jcb: /^(?:2131|1800|35\d{3})\d{11}/,
    Aura: /^(5078\d{2})(\d{2})(\d{11})$/,
  };
  let [banner] = Object.entries(cards).find(([, regex]) =>
    regex.test(cardNumber),
  ) || [null];
  return banner;
};
export const getCurrentDiscount = data => {
  if (!data) {
    return null;
  }

  let [current] = data
    .map(({date, startTime, endTime}) => {
      if (moment(date).day() !== moment().day()) {
        return false;
      }

      let start = moment(startTime, 'HH:mm:ss');
      let end = moment(endTime, 'HH:mm:ss');
      if (end.isBefore(start)) {
        end.add(1, 'day');
      }
      return moment().isBetween(start, end) && end;
    })
    .filter(date => !!date);
  if (!current) {
    return null;
  }
  return current;
};
export const getMainTag = data => {
  if (!data) {
    return null;
  }

  let [main] = data.filter(({Tag}) => Tag.main === 1);
  if (!main) {
    return null;
  }

  return main.Tag;
};
export const timesInPlace = (partnerId, unitId, userInfo) => {
  if (!userInfo || !userInfo.validations) {
    return null;
  }

  let times = userInfo.validations.filter(
    ({PartnerUnit}) =>
      PartnerUnit?.partnerId === partnerId && PartnerUnit?.id === unitId,
  ).length;
  return times || null;
};
export const getUnit = (units, unitId) => {
  let [unit] = units.filter(unit => unit.id === unitId);
  return unit;
};
export const getNextEventStageDate = data => {
  let now = moment();
  let [firstPeriod] = (data || [])
    .filter(({startDate, endDate, time}) => {
      let isBefore = now.isBefore(`${startDate} ${time}`);
      let isBetween = now.isBetween(
        `${startDate} ${time}`,
        moment(endDate).endOf('day'),
      );
      return isBefore || isBetween;
    })
    .sort(
      (one, another) => new Date(one.startDate) - new Date(another.startDate),
    );

  let eventStatus = moment(now).isBetween(
    firstPeriod.startDate,
    firstPeriod.endDate,
  );
  if (eventStatus === true) {
    return firstPeriod ? moment() : null;
  } else {
    return firstPeriod
      ? moment(`${firstPeriod.startDate} ${firstPeriod.time}`)
      : null;
  }
  // return firstPeriod
  //   ? moment(`${firstPeriod.startDate} ${firstPeriod.time}`)
  //   : null;
};
export const formatPrice = (value, showPrefix = true) => {
  let [integers, decimals] = Number(value).toFixed(2).split('.');
  return (
    (showPrefix ? 'R$ ' : '') +
    integers.split(/(?=(?:...)*$)/).join('.') +
    ',' +
    decimals
  );
};
export const getFilters = ({type, completeData}) => {
  let allPlacesFilters = () =>
    completeData
      .map(({partner}) => partner.PartnerTags.map(({Tag}) => Tag))
      .flat();
  let allEventsFilters = () =>
    completeData.map(event => event.EventsTags.map(({Tag}) => Tag)).flat();
  let allFilters = {
    places: allPlacesFilters,
    events: allEventsFilters,
  }[type]();
  let nonRepeatedFiltersSlugs = dedup(allFilters.map(filter => filter.slug));
  let nonRepeatedFilters = nonRepeatedFiltersSlugs
    .map(slug => allFilters.find(filter => filter.slug === slug))
    .sort((one, another) => one.name.localeCompare(another.name, 'pt'));
  return nonRepeatedFilters;
};
export const getCountdown = (start, hoursUniilTheEnd, now) => {
  let startDate = new Date(start);
  startDate.setHours(startDate.getHours() + hoursUniilTheEnd);
  let hours = String(~~((startDate - now) / (1000 * 60 * 60))).padStart(2, '0');
  let minutes = String(~~(((startDate - now) / (1000 * 60)) % 60)).padStart(
    2,
    '0',
  );
  let seconds = String(~~(((startDate - now) / 1000) % 60)).padStart(2, '0');
  return [hours, minutes, seconds].filter(Boolean).join(':');
};
