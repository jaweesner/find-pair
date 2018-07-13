var assert = require('assert');
var {findPair, csvToArr} = require('./find-pair.js');


Promise.all([
  //check csv function
  csvToArr('testData.txt')
    .then(val => {
      assert(Array.isArray(val), 'Function should return an array');
      assert(typeof val[0] === 'object', 'Returned array should contain objects');
      assert(val.length === 6, 'The array should have one object for each line in test data file');
      assert(val[0].name === 'Candy Bar' && val[0].price === 500,
        'The objects should have a name and a price property that match each file line');
    }),

  //Check invalid balance
  findPair('testData.txt', 99)
    .then( val => {
      assert(val === 'Not possible', 'No matching pairs values should have been found')
    }),

  //Check valid balance -- exact value
  findPair('testData.txt', 2400 )
  .then( val => {
    assert(val === 'Detergent 1000, Headphones 1400', 'Selected pairs are not correct for balance 2400')
  }),

  //Check valid balance -- closest value
  findPair('testData.txt', 1800 )
  .then( val => {
    assert(val === 'Paperback	Book 700, Detergent 1000', 'Selected pairs are not correct for balance 1800')
  }),

  //Check valid balance -- large balance
  findPair('testData.txt', 99999999)
  .then( val => {
    assert(val === 'Earmuffs 2000, Bluetooth	Stereo 6000', 'Selected pairs are not correct for balance 99999999')
  }) 
]).then(() => console.log('All Tests Passed'))
  .catch( err =>
  console.error('Error:', err.message)
)