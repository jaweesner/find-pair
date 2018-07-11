const fs = require('fs');
 
function findPair (file, balance){
   //get prices into memory. Assumption that file can be stored in memory.
   //if file too large to reside in memeory, could refactor to read data file in chunks.
  // priceArr = <TODO> PROCESS FILE </TODO>;
  const priceArr = JSON.parse(file)

  console.log(balance, typeof balance)
  console.log(priceArr, typeof priceArr)
  

   //array might not fit entirely in memory
   //assumption is that virtual paging in this case will not cause significant issues.

   let smallPointer = priceArr[0];
   let smallIndex = 0;
   let largeIndex = 1;
   let largePointer = priceArr[largeIndex];
   //early end if falsy set 
   if(smallPointer.price + largePointer.price > balance){
     return 'Not possible'
   }
   //get pointer to the max value that can be added to min value
   //perform a bin search to get the largest value not oversize
   while(balance > smallPointer.price + largePointer.price){
     //<TODO>
     
      largePointer = priceArr[++largeIndex];
     // </TODO>
   }
   largePointer = priceArr[--largeIndex];

   let minDifference = balance - (largePointer.price + smallPointer.price);
   let minSmall = smallPointer;
   let minLarge = largePointer;
   
   //if minDifference is 0, this is a best solution, return
   //else check all values
   while (largeIndex > smallIndex+1 && minDifference){
     //get new min value

     smallPointer = priceArr[++smallIndex];
     //find the best solution for the matching value
     console.log(smallPointer)
     console.log(largePointer)
     while (largePointer.price + smallPointer.price > balance){
       largePointer = priceArr[--largeIndex];
     }
     //if this pairing is a better solution, swap with tracking vars
     if (balance - (largePointer.price + smallPointer.price)  <  minDifference){
       minDifference = balance - (largePointer.price + smallPointer.price);
       minSmall = smallPointer;
       minLarge = largePointer;
     }
   }

     return `${minSmall.name} ${minSmall.price} ${minLarge.name} ${minLarge.price}`
   };


   
   //need to find a pair of values in sorted list that equal balance, or barring that, find the values that add of closest to value.
   //need to return only one set of values. Must be two distinct values, not 
   //we want to find the value that most closely matches balance, no other constrainsts
   //return names and prices of items


   //ideally, we would be able to hold the entire file in memory. If the file was extremely large, alternative methods may need to be taken. 
  //edge cases, 2 items in list have same price. 
   //start off with sanity check with first two values in list. If not less than the balance, not Possible. Only case which is true. 
   //sorted array of tuples. keep track of smallest difference
   //two pointers, set inital state with smallP at arr[0], iterate over array to arr[i] where arr[i] is less than balance - i
console.log(findPair(process.argv[2], process.argv[3]));



/*
You have been given a gift card that is about to expire and you want to buy
gifts for 2 friends. You want to spend the whole gift card, or if that’s not an
option as close to it as possible. You have a list of sorted prices for a
popular store that you know they both like to shop at. Your task is to find
two distinct items in the list whose sum is minimally under (or equal to) the
gift card balance.


The file contains two columns:
A unique identifier of the item. You can assume there are no
duplicates.
The value of that item in cents. It is always a positive integer that
represents the price in cents (1000 = $10.00).
Write a program to find the best two items. It takes two inputs:
A filename with a list of sorted prices
The balance of your gift card
If no two items have a sum that is less than or equal to the balance on the
gift card, print “Not possible”. You don’t have to return every possible pair
that is under the balance, just one such pair.

*/