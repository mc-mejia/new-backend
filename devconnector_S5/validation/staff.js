const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateStaffInput(data) {
  let errors = {};

  data.staffname = !isEmpty(data.staffname) ? data.staffname : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  if (Validator.isEmpty(data.staffname)) {
    errors.staffname = 'Staff name is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
