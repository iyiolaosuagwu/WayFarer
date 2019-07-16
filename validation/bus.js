/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './is-empty';

const validateBusInput = (data) => {
   const errors = {};

   data.numberplate = !isEmpty(data.numberplate) ? data.numberplate : '';
   data.manufacturer = !isEmpty(data.manufacturer) ? data.manufacturer : '';
   data.model = !isEmpty(data.model) ? data.model : '';
   data.capacity = !isEmpty(data.capacity) ? data.capacity : '';
   data.year = !isEmpty(data.year) ? data.year : '';


   if (Validator.isEmpty(data.numberplate)) {
      errors.numberplate = 'numberplate field is required';
   }

   if (Validator.isEmpty(data.manufacturer)) {
      errors.manufacturer = 'manufacturer field is required';
   }

   if (Validator.isEmpty(data.model)) {
      errors.model = 'model field is required';
   }

   if (Validator.isEmpty(data.capacity)) {
      errors.capacity = 'capacity field is required';
   }

   if (Validator.isEmpty(data.year)) {
      errors.year = 'year field is required';
   }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};


export default validateBusInput;
