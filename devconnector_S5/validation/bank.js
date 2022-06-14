const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBankInput(data) {
  let errors = {};

  data.balance = !isEmpty(data.balance) ? data.balance : '';
  data.type = !isEmpty(data.type) ? data.type : '';
  data.label = !isEmpty(data.label) ? data.label : '';

  if (Validator.isEmpty(data.label)) {
    errors.label = 'Bankaccount labels are required';
  }

  if (Validator.isEmpty(data.balance)) {
    errors.balance = 'Starter balance is required';
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = 'Bank type is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
