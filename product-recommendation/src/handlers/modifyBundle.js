'use strict'
let listOfBundles = require('./../../data/bundles')
let constant = require('./../constant')
let Validate = require('./../validate')
let recommendBundle = require('./recommendBundle')

/**
 * This function is allowing user to customize bundle by adding, removing, or upgrading products.
 * @param  {[object]}  userObj          Object of user
 * @param  {[array]}  activities        The list activities that user want to do, such as: 'add', 'remove', 'swap'
 * @return {[array]}     The product list bundle that user will get after customize
 */
module.exports = function(userObj, activities, Bundles = listOfBundles) {
  // validate activities
  Validate.activitiesCustomerWant(activities);
  let age, isStudent, income, bundleName, productList;
  if (typeof userObj === 'object') {
    age = userObj.age;
    isStudent = userObj.isStudent;
    income = userObj.income;
    bundleName = userObj.bundleName;
    productList = userObj.productList;
  }
  // get current bundle and products for this user
  let swapBundleProduct;
  if (bundleName === undefined) {
    bundleName = recommendBundle(age, isStudent, income, true);
  }
  if (productList === undefined) {
    productList = Bundles[bundleName].products;
  }
  // start modify bundle
  if (activities.swap) { // swap first
    if (!Bundles[activities.swap]) {
      throw `swap package ` + activities.swap + ` is not avallable`;
    }
    Validate.bundleSwapAdded(activities.swap, age, isStudent, income);
    bundleName = activities.swap;
    productList = Bundles[bundleName].products;
  }
  Object.keys(activities).some(function(activity) {
    switch (activity) {
      case 'add':
        // validate product added
        Validate.productAdded(activities[activity], bundleName, age, isStudent, income);
        productList = productList.concat(activities[activity]);
        break;
      case 'remove':
        productList = productList.filter(item => activities[activity].indexOf(item) < 0)
        break;
    }
  });
  return productList;
};
