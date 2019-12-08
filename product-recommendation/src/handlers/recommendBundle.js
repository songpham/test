'use strict'
let listOfBundles = require('./../../data/bundles')
let constant = require('./../constant')
let Validate = require('./../validate')

/**
 * This function will return the recommend bundle to user when they give the question
 * @param  {[integer]}  age            Age of user
 * @param  {['yes', 'no']} isStudent   Is user a student
 * @param  {[integer]}  income         Income monthly from user
 * @param  {Boolean} isReturnBundle    If we need this function return a bundle with a list of products they have, set true, default is false
 * @return integer || bundle object
 */
module.exports = function(age, isStudent, income, isReturnBundle, Bundles = listOfBundles) {
  let recommend = null;
  // validate inputs
  Validate.questionFromCustomer(age, isStudent, income);
  if (age > 17) {
    if (income > 40000) {
      recommend = 'gold';
    } else if (income > 12000) {
      recommend = 'classic_plus';
    } else if (income > 0) {
      recommend = 'classic';
    } else if (isStudent === constant.STUDENT_ANSWER[0]) {
      recommend = 'student';
    }
  } else {
    recommend = 'junior_saver';
  }
  return recommend !== null ? (isReturnBundle === true ? recommend : Bundles[recommend].value) : null;
};
