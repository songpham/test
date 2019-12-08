'use strict'
let constant = require('./constant')

/**
 * Validate the request that user send. If the request is not valid, system will throw error
 * @param  {[integer]}  age            Age of user
 * @param  {['yes', 'no']} isStudent   Is user a student
 * @param  {[integer]}  income         Income monthly from user
 */
let questionFromCustomer = function(age, isStudent, income) {
  // validate age
  if (isNaN(age) || !Number.isInteger(age) || age < 0) {
    throw `Age should be 0-17, 18-64, 65+`
  }
  // validate isStudent
  if (constant.STUDENT_ANSWER.indexOf(isStudent) < 0) {
    throw `Is Student should be yes or no`
  }
  // validate income
  if (isNaN(income) || income < 0) {
    throw `Income should be > 0`
  }
};

/**
 * Validate the activities that user want. If the activities is not valid, system will throw error
 * @param  {[array]}  activities array of activities that user want
 */
let activitiesCustomerWant = function(activities) {
  if (typeof activities !== 'object') {
    throw `activity is not a valid object`
  } else {
    Object.keys(activities).some(function(activity) {
      if (constant.ACTIVITY_APPROVED.indexOf(activity) < 0) {
        throw `detail activity is not a valid name`
      }
    });
  }
};

/**
 * Validate the product that user want to add to their bundle. If the request is not valid, system will throw error
 * @param  {[array]}  productAddedList array of product user want to add
 * @param  {[string]}  currentBundleName   Name of current bundle from this user
 * @param  {[integer]}  age            Age of user
 * @param  {['yes', 'no']} isStudent   Is user a student
 * @param  {[integer]}  income         Income monthly from user
 * @return null
 */
let productAdded = function(productAddedList, currentBundleName, age, isStudent, income) {
  if (productAddedList.length < 1) {
    throw `The list product added is empty`
  }
  productAddedList.some(function(productName) {
    switch (productName) {
      case 'current_account':
        if (!(income > 0 && age > 17)) {
          throw `You can't add ` + productName + ` because: income > 0 && age > 17`;
        }
        break;
      case 'current_account_plus':
      case 'gold_credit_card':
        if (!(income > 40000 && age > 17)) {
          throw `You can't add ` + productName + ` because: income > 40000 && age > 17`;
        }
        break;
      case 'junior_saver_account':
        if (!(age < 18)) {
          throw `You can't add ` + productName + ` because: age < 18`;
        }
        break;
      case 'student_account':
        if (!(isStudent === 'yes' && age > 17)) {
          throw `You can't add ` + productName + ` because: isStudent === 'yes' && age > 17`;
        }
        break;
      case 'debit_card':
        if (!(['current_account', 'current_account_plus', 'student_account'].indexOf(currentBundleName) < 0)) {
          throw `You can't add ` + productName + ` because your account is not in: ['Current Account','Current Account Plus', 'Student Account']`;
        }
        break;
      case 'credit_card':
        if (!(income > 12000 && age > 17)) {
          throw `You can't add ` + productName + ` because: income > 12000 && age > 17`;
        }
        break;
    }
  });
};

/**
 * Validate the bundle that user want to swap. If the request is not valid, system will throw error
 * @param  {[string]}  bundleSwapName   Name of bundle that user want to swap
 * @param  {[integer]}  age            Age of user
 * @param  {['yes', 'no']} isStudent   Is user a student
 * @param  {[integer]}  income         Income monthly from user
 * @return null
 */
let bundleSwapAdded = function(bundleSwapName, age, isStudent, income) {
  switch (bundleSwapName) {
    case 'junior_saver':
      if (!(age < 18)) {
        throw `You can't swap to ` + bundleSwapName + ` because: age < 18`;
      }
      break;
    case 'student':
      if (!(age > 17 && isStudent === 'yes')) {
        throw `You can't swap to ` + bundleSwapName + ` because: age > 17 && isStudent === 'yes'`;
      }
      break;
    case 'classic':
      if (!(age > 17 && income > 0)) {
        throw `You can't swap to ` + bundleSwapName + ` because: age > 17 && income > 0`;
      }
      break;
    case 'classic_plus':
      if (!(age > 17 && income > 12000)) {
        throw `You can't swap to ` + bundleSwapName + ` because: age > 17 && income > 12000`;
      }
      break;
    case 'gold':
      if (!(age > 17 && income > 40000)) {
        throw `You can't swap to ` + bundleSwapName + ` because: age > 17 && income > 40000`;
      }
      break;
  }
};

module.exports = {
  questionFromCustomer,
  activitiesCustomerWant,
  productAdded,
  bundleSwapAdded
};
