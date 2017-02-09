import moment from 'moment';

export const validators = {
 required: value => value ? undefined : 'Required'
}

export const isValidDate = current => current.isAfter(moment().subtract(1, 'day'));