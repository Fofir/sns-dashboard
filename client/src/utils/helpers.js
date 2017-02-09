import moment from 'moment';

export const validators = {
 required: value => value ? undefined : 'Required'
}

export const isValidDate = current => current.isAfter(moment().subtract(1, 'day'));

export const mapByField = (arr = [], field = '_id') => {
  return arr.reduce((curr, item) => {
    return { ...curr, [item[field]]: item };
  }, {});
};
