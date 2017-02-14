// Sample Weresquirrel Journal Entry
// var anEntry =
//     {
// 	events:["pizza", "touched tree", "work", "peanuts", "television"],
// 	squirrel: true
//     };


var journal = [];

function addEntry(events, didITurnIntoASquirrel) {
    journal.push(
	{
	    events: events,
	    squirrel: didITurnIntoASquirrel
	});
}


function phi(table) {
    phiNumer = ((table[3] * table[0]) - (table[2] * table[1]));
    phiDenom = Math.sqrt((table[2] + table[3]) * (table[0] + table[1]) *
			 (table[1] + table[3]) * (table[0] + table[2]));
    return (phiNumer / phiDenom);
}


function hasEvent(event, entry) {
    // If the event is found in the events array of the entry object,
    // then entry.events.indexOf(event) returns the index in the events
    // of the event.  If it is not found in the array, a value of -1 is
    // returned.  Thus, by testing to see if the return value is -1 or not,
    // we can ascertain if the event is in the array of events of a
    // given entry.
    return entry.events.indexOf(event) != -1;
}



function tableFor(event, journal) {
    // Initialize the table array
    var table = [0, 0, 0, 0];

    // Loop through the journal, testing each entry's events array
    // to see if it contains the event passed to the "event" parameter.
    // Recall that the first entry in the table array represents
    // No event, Squirrel = false
    // The second table array element represents
    // Event, Squirrel = false
    // Third is No Event, Squirrel = true
    // Fourth is Event, Squirrel = true
    for (var i = 0; i < journal.length; i++) {
	var entry = journal[i], index = 0;
	if (hasEvent(event, entry))
	    index += 1;
	if (entry.squirrel)
	    index += 2;
	table[index] += 1;
    }
    return table;
}



// Storing the resulting correlations:
var map = {};

function storePhi(event, phi) {
    map[event] = phi;
}

storePhi("pizza", 0.069);
storePhi("touched tree", -0.081);

console.log("pizza" in map); // returns true
console.log(map["touched tree"]); // returns -0.081

for (var event in map) {
    console.log("The correlation for '" + event + "' is " + map[event]);
}

// e.g. leading to output
// The correlation for 'pizza' is 0.069
// The correlation for 'touched tree' is -0.081


// Loop through the journal and calculate the correlations for each event
function gatherCorrelations(journal) {
    var phis = {};
    for (var entry = 0; entry < journal.length; entry++) {
	var events = journal[entry].events;
	for (var i = 0; i < events.length; i++) {
	    var event = events[i];
	    if (!(event in phis))
		phis[event] = phi(tableFor(event, journal));
	}  // end inner for loop
    } // end outer for loop
}


var correlations = gatherCorrelations(JOURNAL);
console.log(correlations.pizza); // yields 0.068599434

for (var event in correlations)
    console.log(event + ": " + correlations[event]);

// carrot: 0.0140970969
// exercise: 0.0685994341
// weekend: 0.1371988681
// bread: -0.0757554019
// pudding: -0.0648203724
// ... etc.


// Filter correlations of events so that only the events with correlations
// greater than 0.1 or less than -0.1 are displayed
for (var event in correlations) {
    var correlation = correlations[event];
    if (correlation > 0.1 || correlation < -0.1)
	console.log(event + ": " + correlation);
}


for (var i = 0; i < JOURNAL.length; i++) {
    var entry = JOURNAL[i];
    if (hasEvent("peanuts", entry) && !hasEvent("brushed teeth", entry))
	entry.events.push("peanut teeth");
}

console.log(phi(tableFor("peanut teeth", JOURNAL)));
// Results in a correlation = 1 .  Perfect correlation!
// Weresquirrel happens when eating peanuts and not brushing teeth.


// Playing with shift and unshift
var todoList = [];

// Add a new task to the task list, with normal priority
// i.e. to the END of the list.
function rememberTo(task) {
    todoList.push(task);
}

// Return the next item on the ToDo List
function whatIsNext() {
    return todoList.shift();
}


// Add a new task to the task list, with urgent priority
// i.e. to the BEGINNING of the list.
function urgentlyRememberTo(task) {
    todoList.unshift(task);
}



// Other array functions:
function remove(array, index) {
    return array.slice(0, index).concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// returns array ["a", "b", "d", "e"]



// Using String versions of slice() and indexOf()
console.log("coconuts".slice(4,7));    // returns "nut"
console.log("coconuts".indexOf("u"));  // returns 5


// Using String version of indexOf()
console.log("one two three".indexOf("ee"));  // returns 11


// Using trim()
console.log("   ok  \n ".trim());  // returns "okay"


// Other string functions
var string = "abc";
console.log(string.length);  // returns 3
console.log(string.charAt(0));  // returns "a"
console.log(string[1]);   // returns "b"




// The Arguments Object
function argumentCounter() {
    console.log("You gave me " + arguments.length + " arguments.");
}

argumentCounter();                        // returns You gave me 0 arguments.
argumentCounter("stuff");                 // returns You gave me 1 arguments.
argumentCounter("stuff", "More stuff");   // returns You gave me 2 arguments.



// Alternate addEntry function
function addEntry(squirrel) {
    var entry = { events: [], squirrel: squirrel};
    for (var i = 1; i < arguments.length, i++)
	entry.events.push(arguments[i]);
    journal.push(entry);
}
addEntry(true, "work", "touched tree", "pizza", "running", "television");


// The Math object
function randomPointOnCircle(radius) {
    var angle = Math.random() * 2 * Math.PI;
    return {x: radius * Math.cos(angle), y: radius * Math.sin(angle)};
}
console.log(randomPointOnCircle(2));


// Math.floor()
console.log(Math.floor(Math.random() * 10)); // returns a random integer



// Chapter 4 Exercises

// Exercise 1: The Sum of a Range
// Implement range() and sum() functions such that:
// range() should take a start and end parameter and return an array that
// includes both end points.

function range(start, end) {
    var resultArray = [];
    for (var i = start; i <= end; i++) 
	resultArray.push(i);
    return resultArray;
}


function sum(myArray) {
    var mySum = 0;
    for (var i = 0; i < myArray.length; i++)
	mySum += myArray[i];
    return mySum;
}


function range2(start, end, step) {
    var resultArray = [];

    if (start < end) {
	if (arguments.length < 3)
	    step = 1;
	for (var i = start; i <= end; i+=step) 
	    resultArray.push(i);
    }
    else {
	if (arguments.length < 3)
	    step = -1;
	for (var i = start; i >= end; i+=step) 
	    resultArray.push(i);
    }
    return resultArray;
}




//  Exercise 2: Reversing an array
//  Implement a function (reverseArray) to reverse a copy of the input array.
//  Implement a second function (reverseArrayInPlace) to reverse an input array, in place.

function reverseArray(inputArray) {
    var resultArray = [];
    var j = 0;
    for (var i = inputArray.length - 1; i >= 0; i--) {
	resultArray[j] = inputArray[i];
	j++;
    }
    return resultArray;
}


function reverseArrayInPlace(inputArray) {
    // Destructive (in-place) version
    var i = 0, j = inputArray.length - 1;
    var temp;

    while (i <= j) {
	temp = inputArray[i];
	inputArray[i] = inputArray[j];
	inputArray[j] = temp;
	i++;
	j--;
    }
    return inputArray;
}




//  Exercise 3: A list
//  Write a function arrayToList that builds up a data structure like the
//  previous one when given [1, 2, 3] as argument, and write a listToArray
//  function that produces an array from a list. Also write the helper
//  functions prepend, which takes an element and a list and creates a new
//  list that adds the element to the front of the input list, and nth, which
//  takes a list and a number and returns the element at the given position
//  in the list, or undefined when there is no such element.
//  If you haven't already, also write a recursive version of nth.


// Take 4

function prepend(value, list) {
    // Helper function for arrayToList function.
    // Adds an element to the front of the list.

    var newList = {value: value, rest:list };
    return newList;
}

function arrayToList(inputArray) {
    var list = null;

    for (var i = inputArray.length - 1; i >=0; i--) {
      	list = prepend(inputArray[i], list);
    }
    return list;
}


function listToArray(list) {
    var myArray = [];
    var next = list;
    
    //while(next.rest != null) {
    while(next != null) {	
	myArray.push(next.value);
	next = next.rest;
    }
    
    return myArray;
}


function nth(list, index) {
    var next = list;
    
    for (var i = 0; i < index; i++) {
	if (next != null)
	    next = next.rest;
    }

    if (next != null)
	return next.value;
    else
	return null;

}



// Recursive version of nth:
// UNTESTED!!!!
function nthRecursive(list, index) {
    if (list == null)
	return null;
    else {
	if (index == 0)
	    return list.value;
	else
	    return nthRecursive(list.next, index - 1)
    }
}





// // Take 3

// // function element(value) {
// //     this.value = value;
// //     this.rest = null;
// // }


// function prepend(value, list) {
//     // Helper function for arrayToList function.
//     // Adds an element to the front of the list.
//     // If list is null, create a new list

// //    var anElement = new element(value);
  
//     // if (list != null) {
//     // 	anElement.rest = list;
//     // 	list = anElement;
//     // }
//     // else
//     // 	list = anElement;

//     // if (list != null) {
//     // 	list.rest = list;
//     // 	list.value = value;
//     // }
//     // else
//     //   	var list = { value: value, rest: null }; 
//     // return list;

//     var newList = {value: value, rest:list };
//     return newList;
// }

// function arrayToList(inputArray) {
//     //var myElement = null;
//     var list = null;
//     //for (var i = 0; i < inputArray.length; i++) {
//     for (var i = inputArray.length - 1; i >=0; i--) {
// 	// create an element
// 	//myElement = new element(inputArray[i], null);
// 	//prepend(myElement, list);
//       	//console.log(inputArray[i]);
//       	list = prepend(inputArray[i], list);
//       	//console.log(list);
//     }
//     return list;
// }


// function listToArray(list) {
//     var myArray = [];
//     var next = list;
    
//     while(next.rest != null) {
// 	myArray.push(next.value);
// 	next = next.rest;
//     }
    
//     return myArray;
// }


// function nth(index, list) {


// }







// // Take 2
// function element(value) {
//     this.value = value;
//     this.rest = null;
// }


// function prepend(value, list) {
//     // Helper function for arrayToList function.
//     // Adds an element to the front of the list.
//     // If list is null, create a new list

//   	var anElement = new element(value);
  
//     if (list != null) {
// 		anElement.rest = list;
// 		list = anElement;
//     }
//     else
// 		list = anElement;
  
//   	return list;
// }

// function arrayToList(inputArray) {
//     //var myElement = null;
//     var list = null;
//     //for (var i = 0; i < inputArray.length; i++) {
//     for (var i = inputArray.length - 1; i >=0; i--) {
// 		// create an element
// 		//myElement = new element(inputArray[i], null);
// 		//prepend(myElement, list);
//       	console.log(inputArray[i]);
//       	list = prepend(inputArray[i], list);
//       	//console.log(list);
//     }
// 	return list;
// }







// // Take 1
// function element(value) {
//     this.value = value;
//     this.rest = null;
// }


// function prepend(value, list) {
//     // Helper function for arrayToList function.
//     // Adds an element to the front of the list.
//     // If list is null, create a new list

//     var anElement = new element(value);

//     if (list != null) {
// 	anElement.rest = list;
// 	list = anElement;
//     }
//     else
// 	list = anElement;

//     return list;
// }

// function arrayToList(inputArray) {
//     var myElement = null;
//     var list = null;
//     for (var i = 0; i < inputArray.length; i++) {
// 	// create an element
// 	myElement = new element(inputArray[i], null);
// 	prepend(myElement, list);
//     }
//     return list;
// }


// function listToArray(list) {


// }


// function nth(index, list) {


// }


// A class instead would be more useful
// function createList() {
//     var length = 0;

//     function addElement(value) {


//     }

//     function removeElement(element, list) {


//     }

//     function nth(index) {


//     }


//     function prepend(element, list) {
	

//     }



//     function arrayToList(inputArray) {


//     }


//     function listToArray() {


//     }
    
// }






/****************************************************************************************
  Exercise 4
 ****************************************************************************************/

/*
Deep comparison
The == operator compares objects by identity. But sometimes, you would
prefer to compare the values of their actual properties.

Write a function, deepEqual, that takes two values and returns true only
if they are the same value or are objects with the same properties whose
values are also equal when compared with a recursive call to deepEqual.

To find out whether to compare two things by identity (use the ===
operator for that) or by looking at their properties, you can use the
typeof operator. If it produces "object" for both values, you should do a
deep comparison. But you have to take one silly exception into account:
by a historical accident, typeof null also produces "object".
*/


function deepEqual(objA, objB) {
    if ((typeof(objA) == object) && (typeof(objB) == object)) {
	if ((objA == null) || (objB == null))
	    return false;
	else {

	}

    }

}




/* Provided Solution

function deepEqual(a, b) {
    if (a === b)
	return true;
    if (a == null || typeof a != "object" ||  b == null || typeof b != "object")
	return false;
    var propsInA = 0, propsInB = 0;
    
    for (var prop in a)
	propsInA += 1;
    for (var prop in b) {
	propsInB += 1;
	if (!(prop in a) || !deepEqual(a[prop], b[prop]))
	    return false;  
    }
    return propsInA == propsInB;
}
var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
//  true
console.log(deepEqual(obj, {here: 1, object: 2}));
//  false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
//  true


*/
	    
