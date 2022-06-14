const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBenInput(data) {
  let errors = {};

  data.beneficiaryId = !isEmpty(data.beneficiaryId) ? data.beneficiaryId : '';
  data.bankAccountNumber = !isEmpty(data.bankAccountNumber) ? data.bankAccountNumber : '';


  if (Validator.isEmpty(data.beneficiaryId)) {
    errors.balance = 'Beneficiary ID is required';
  }

  if (Validator.isEmpty(data.bankAccountNumber)) {
    errors.type = 'Beneficiary Bank Account ID is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
