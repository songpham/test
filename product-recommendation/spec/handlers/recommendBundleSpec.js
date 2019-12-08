'use strict'
let Bundles = require('./../../data/bundles')
describe("Bundle recommend:", function() {
  var underTest = require('./../../src/handlers/recommendBundle');
  it('should throw an error if request is not valid', () => { // ok

    expect(() => underTest()).toThrow()

    expect(() => underTest('a')).toThrow('Age should be 0-17, 18-64, 65+')

    expect(() => underTest(1.5)).toThrow('Age should be 0-17, 18-64, 65+')

    expect(() => underTest(-1)).toThrow('Age should be 0-17, 18-64, 65+')

    expect(() => underTest(18, 'a')).toThrow('Is Student should be yes or no')

    expect(() => underTest(18, 'yes', 'a')).toThrow('Income should be > 0')

    expect(() => underTest(18, 'no', -1)).toThrow('Income should be > 0')
  })
  it("should be recommend a matching card", function() {

    expect(underTest(16, 'yes', 0)).toEqual(Bundles.student.value); // {age: 16, isStudent: yes, income: 0} => student

    expect(underTest(18, 'no', 25000)).toEqual(Bundles.classic_plus.value); // {age: 18, isStudent: no, income: 25000} => classic_plus

  });
});
