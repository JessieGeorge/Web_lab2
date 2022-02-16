"use strict";

// synchronize output
// param 1 in writeSync means write to standard output
// global variable fs
const fs = require('fs');

function isValid(arr) {
	// must be console.log, since writeSync only takes Strings.
	console.log(`\narray = [${arr}]`);
	try{
		if (arr.length == 0) {
			throw "Empty array.";
		}
		
		for (let i = 0; i < arr.length; i++) {
			if(isNaN(arr[i])) {
				throw "Array contains a value which is not a number.";
			}
		}
	} catch(e) {
		// needed for synchronous error logging
		fs.writeSync(1, `ERROR: ${e}`); 
		return false;
	}
	return true;
}

function max1(arr) {
	if (!isValid(arr))
		return;

	let max = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > max) {
			max = arr[i];
		}
	}

	return max;
}

function max2(arr) {
	if (!isValid(arr))
		return;

	let max = arr[0];
	arr.forEach(element => {
		if (element > max) {
			max = element;
		}
	});

	return max;
}

function max3(arr) {
	if (!isValid(arr))
		return;

	const reducer = (prevValue, currentValue) => {
		if (currentValue > prevValue) {
			return currentValue;
		} else {
			return prevValue;
		}
	};

	return arr.reduce(reducer);
}

function printResult(result) {
	/*
	If there were errors printed by the isValid function,
	the max# functions will return undefined, so that they can stop processing.
	We don't need to print undefined in the result.
	*/
	if (result != undefined) {
		// must be console.log, since writeSync only takes Strings.
		console.log(result); 
	}

	return ""; // just to make writeSync happy in the main function
}

function main() {
	fs.writeSync(1, "\nFUNCTION max1 OUTPUT:");
	fs.writeSync(1, printResult(max1([])));
	fs.writeSync(1, printResult(max1([1, 2, 's'])));
	fs.writeSync(1, printResult(max1([3,5,4,6,5])));

	fs.writeSync(1, "\nFUNCTION max2 OUTPUT:");
	fs.writeSync(1, printResult(max2([])));
	fs.writeSync(1, printResult(max2([1, 2, 's'])));
	fs.writeSync(1, printResult(max2([3,5,4,6,5])));

	fs.writeSync(1, "\nFUNCTION max3 OUTPUT:");
	fs.writeSync(1, printResult(max3([])));
	fs.writeSync(1, printResult(max3([1, 2, 's'])));
	fs.writeSync(1, printResult(max3([3,5,4,6,5])));
}

main();
