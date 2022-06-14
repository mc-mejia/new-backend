const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTransInput(data) {
  let errors = {};

  data.date = !isEmpty(data.date) ? data.date : '';
  data.amount = !isEmpty(data.amount) ? data.amount : '';
  data.type = !isEmpty(data.type) ? data.type : '';
  data.benId = !isEmpty(data.benId) ? data.benId : '';
  data.bankId = !isEmpty(data.bankId) ? data.bankId : '';
  data.reason = !isEmpty(data.reason) ? data.reason : '';




  if (Validator.isEmpty(data.date)) {
    errors.date = 'Date is required';
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'Transaction amount is required';
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = 'Transaction type is required';
  }

  if (Validator.isEmpty(data.benId)) {
    errors.benId = 'Beneficiary number is required';
  }
  if (Validator.isEmpty(data.bankId)) {
    errors.bankId = 'Bank account is required';
  }




  return {
    errors,
    isValid: isEmpty(errors)
  };
};
