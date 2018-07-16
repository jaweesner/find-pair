#!/usr/bin/env node

const fs = require('fs');
const path = require('path'); 

 
function findPair (file, balance) {
   //get prices into memory. Assumption that file can be stored in memory/virtual paging will not cause significant issues.
  return csvToArr(file).catch((err) => {
    console.error(err)
    throw 'Error reading file, check your file path'
   })
  .then((priceArr)=>{
    if (priceArr.length<2){
      throw 'Two items or more must be in file'
    }
    if (!(balance = parseInt(balance))){
      throw 'Balance argument must be a number and is a required parameter'
    }

    let smallPointer = priceArr[0];
    let smallIndex = 0;
    let largeIndex = priceArr.length-1;
    let largePointer = priceArr[largeIndex];

    if(smallPointer.price + priceArr[smallIndex+1].price > balance){
      return 'Not possible'
    }
    //get pointer to the max value that can be added to min value
    while(balance < smallPointer.price + largePointer.price) {
        largePointer = priceArr[--largeIndex];
    }
    let minDifference = balance - (largePointer.price + smallPointer.price);
    let minSmall = smallPointer;
    let minLarge = largePointer;
    
    while (largeIndex > smallIndex+1 && minDifference){
      
      smallPointer = priceArr[++smallIndex];
      //find the best matching value to small pointer
      while (largePointer.price + smallPointer.price > balance){
        largePointer = priceArr[--largeIndex];
      }
      //if this pairing is a better solution, swap with tracking vars
      if (balance - (largePointer.price + smallPointer.price)  <  minDifference) {
        minDifference = balance - (largePointer.price + smallPointer.price);
        minSmall = smallPointer;
        minLarge = largePointer;
      }
    }
    return `${minSmall.name} ${minSmall.price}, ${minLarge.name} ${minLarge.price}`
    });
  };

  function csvToArr(filepath){
    return new Promise ((resolve, reject)=>{
      const data = [];
      //using readstream instead of readfile for scalibility
      const readstream = fs.createReadStream(path.resolve(filepath));
      readstream.on('data', (chunk)=> data.push(chunk))
        .on('error', (err) => reject (new Error(err)))
        .on('end', () => {
          resolve(data.join('')
            .split('\n')
            .map(line => {
              let lineItems = line.split(',').map(item => item.trim()); 
              return {
                name: lineItems[0],
                price: parseInt(lineItems[1])
              } 
            })
          )
        });
    });
  }
  //check needed to only run when file directly run in node process (not in test process)
  if (path.basename(process.argv[1]) === 'find-pair.js'){
    findPair(process.argv[2], process.argv[3]).then(val => console.log(val)).catch(err => console.error(err));
  }
  module.exports.findPair = findPair;
  module.exports.csvToArr = csvToArr;