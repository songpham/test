'use strict'
let object = {
  'junior_saver': {
    products: [
      'junior_saver_account'
    ],
    value: 0
  },
  'student': {
    products: [
      'student_account',
      'debit_card',
      'credit_card'
    ],
    value: 0
  },
  'classic': {
    products: [
      'current_account',
      'debit_card'
    ],
    value: 1
  },
  'classic_plus': {
    products: [
      'current_account',
    'debit_card',
      'credit_card'
    ],
    value: 2
  },
  'gold': {
    products: [
      'current_account_plus',
      'debit_card',
      'gold_credit_card'
    ],
    value: 3
  }
};
module.exports = object;
