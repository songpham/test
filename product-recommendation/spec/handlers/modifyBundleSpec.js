'use strict'
describe("Bundle modify:", function() {
  var underTest = require('./../../src/handlers/modifyBundle');
  it('should throw an error if request is not valid', () => { // ok

    expect(() => underTest()).toThrow()

    expect(() => underTest({
      age: 16,
      isStudent: 'yes',
      income: 0
    }, 'exit')).toThrow('activity is not a valid object')

    expect(() => underTest({
      age: 16,
      isStudent: 'yes',
      income: 0
    }, {
      update: 'debit_card'
    })).toThrow('detail activity is not a valid name')

    expect(() => underTest({
      age: 19,
      isStudent: 'yes',
      income: 1000
    }, { // the test shoud return Classic account (value 1), then we add gold_credit_card to bundle
      'add': []
    })).toThrow('The list product added is empty')

    expect(() => underTest({
      age: 19,
      isStudent: 'yes',
      income: 1000
    }, { // the test shoud return Classic account (value 1), then we add gold_credit_card to bundle
      'add': [
        'gold_credit_card'
      ]
    })).toThrow(`You can't add gold_credit_card because: income > 40000 && age > 17`)

    expect(() => underTest({
      age: 19,
      isStudent: 'yes',
      income: 1000
    }, { // the test shoud return Classic account (value 1), then we swap to bronze bundle
      'swap': 'bronze'
    })).toThrow(`swap package bronze is not avallable`)

    expect(() => underTest({
      age: 19,
      isStudent: 'yes',
      income: 1000
    }, { // the test shoud return Classic account (value 1), then we swap to Classic Plus bundle
      'swap': 'classic_plus'
    })).toThrow(`You can't swap to classic_plus because: age > 17 && income > 12000`);

  })
  it("should return a new bundle", function() {

    expect(underTest({
      age: 19,
      isStudent: 'yes',
      income: 13000,
      bundleName: 'student',
      productList: ['student_account', 'debit_card', 'credit_card']
    }, { // the test shoud return student account (value 0), then we add current_account product, remove debit card
      add: [
        'current_account'
      ],
      remove: [
        'debit_card'
      ]
    })).toEqual(['student_account', 'credit_card', 'current_account']);

    expect(underTest({
      age: 19,
      isStudent: 'yes',
      income: 13000,
      bundleName: 'student',
      productList: ['student_account', 'debit_card', 'credit_card']
    }, { // the test shoud return student account (value 0), swap to Classic plus account (value 2)
      swap: [
        'classic_plus'
      ]
    })).toEqual(['current_account', 'debit_card', 'credit_card']);

    expect(underTest({
      age: 19,
      isStudent: 'yes',
      income: 52000
    }, { // the test shoud return Gold account (value 3), then we remove debit card
      remove: [
        'debit_card'
      ]
    })).toEqual(['current_account_plus', 'gold_credit_card']);

  });
});
