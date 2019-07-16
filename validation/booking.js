/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './is-empty';

const validateBookingInput = (data) => {
   const errors = {};

   data.seatnumber = !isEmpty(data.seatnumber) ? data.seatnumber : '';
   data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
   data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
   data.email = !isEmpty(data.email) ? data.email : '';
   data.tripid = !isEmpty(data.tripid) ? data.tripid : '';
   data.busid = !isEmpty(data.busid) ? data.busid : '';



   if (Validator.isEmpty(data.seatnumber)) {
      errors.seatnumber = 'seatnumber field is required';
   }

   if (Validator.isEmpty(data.firstname)) {
      errors.firstname = 'firstname field is required';
   }

   if (Validator.isEmpty(data.lastname)) {
      errors.lastname = 'lastname field is required';
   }

   if (Validator.isEmpty(data.email)) {
      errors.email = 'email field is required';
   }

   if (!Validator.isEmpty(data.email)) {
      if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
      }
   }

   if (Validator.isEmpty(data.tripid)) {
      errors.tripid = 'tripid field is required';
   }

   if (Validator.isEmpty(data.busid)) {
      errors.busid = 'busid field is required';
   }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};


export default validateBookingInput;
