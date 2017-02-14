// Play
function greet(who) { console.log("Hello " + who); }; greet("Harry"); console.log("Bye");


function power(base, exponent) {
    if (exponent == undefined)
	exponent = 2;
    var result = 1;
    for (var counter = 0; counter < exponent; counter++)
	result *= base;
    return result;
}


function findSolution(target) {
    function find(start, history) {
	if (start == target) {
	    return history;
	}
	else if (start > target) {
	    return null;
	}
	else
	    return find(start + 5, "(" + history + " + 5)") || find(start * 3, "(" + history + " * 3)");
    }
    return find(1, "1");
}



// Chapter 3 Exercises


// Minimum Exercise
function myMin(a, b) {
    if (a < b)
	return a;
    else
	return b;
}

// Recursion Exercise
function isEven(targetNum) {
    targetNum = Math.abs(targetNum);
    if (targetNum == 0)
	return true;
    else if (targetNum == 1)
	return false;
    else
	return isEven(targetNum - 2);
}


// Bean Counting Exercise
function countBs(myString) {
    var numBs = 0;
    for (var count = 0; count < myString.length; count++) {
	if (myString.charAt(count) == "B")
	    numBs++;
    }
    return numBs;
}


function countChar(myString, myChar) {
    var numChars = 0;
    for (var count = 0; count < myString.length; count++)
	if (myString.charAt(count) == myChar)
	    numChars++;
    return numChars;
}



function countBs1(myString) {
    return countChar(myString, "B");
}




