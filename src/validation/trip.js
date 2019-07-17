/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './is-empty';

const validateTripInput = (data) => {
  const errors = {};

  data.origin = !isEmpty(data.origin) ? data.origin : '';
  data.destination = !isEmpty(data.destination) ? data.destination : '';
  data.fare = !isEmpty(data.fare) ? data.fare : '';



  if (Validator.isEmpty(data.origin)) {
    errors.origin = 'origin field is required';
  }

   if (Validator.isEmpty(data.destination)) {
    errors.destination = 'destination field is required';
  }

   if (Validator.isEmpty(data.fare)) {
    errors.fare = 'fare field is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};


export default validateTripInput;
