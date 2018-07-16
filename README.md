# find-pair

The ```find-pair``` application will take two arguments:
1.  A file path containing csv formatted data with two columns - a string identifier and an integer representing price
2.  An integer representing a balance

The output from the application will be two rows form the file with prices whose sum will that either equal or most closely approach, but not exceed, the balance.

### Example
Given the test data:

Candy Bar, 500  
Paperback	Book,	700   
Detergent, 	1000  
Headphones,	1400   
Earmuffs, 2000   
Bluetooth	Stereo,	6000 

We can get the following outputs:

```
$ find-pair 'testData.txt' 2000
Candy Bar 500, Headphones 1400

$ find-pair 'testData.txt' 9999999
Earmuffs 2000, Bluetooth Stereo 6000

$ find-pair 'testData.txt' 99
Not possible
```

### To run: 
node.js must be installed. It can be downloaded here: https://nodejs.org/en/download/

Program can be run by navigating to file directory and running :
```
$ node find-pair.js <FILE PATH> <BALANCE>
```

If wanting to run globally, navigate to the directory and enter:
```
$ npm link
```
You can then access the utility from any location using the command:
```
find-pair <FILEPATH> <BALANCE>
```

To run the test suite, enter 
```
node test
```


### Complexity Notes: 

Time complexity is O(n) (both best and worst case);