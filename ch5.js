// Iterate through an array and perform some action (i.e. pass it a function)

function forEach(array, action) {
    for (var i = 0; i < array.length; i++)
	action(array[i]);
}


forEach([1,2,3], console.log);

total = 0;
myNumbers = [1,2,3,4,5];

forEach(myNumbers, function(number) {
    total += number;
});

console.log(total);
// 15


//Using the builtin forEach method of Arrays
function gatherCorrelations(journal) {
    var phis = {};
    
    journal.forEach(function(entry) {
	entry.events.forEach(function(event) {
	    if (!(event in phis))
		phis[event] = phi(tableFor(event, journal));

	});
    });
    
    return phis;
}



// Higher Order Functions

function greaterThan(n) {
    return function(m) { return m > n; };
}

var greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// true


function noisy(f) {
    return function(arg) {
	console.log(" calling with ", arg);
	var val = f(arg);
	console.log(" called with ", arg, " - got ", val);
	return val;
    };
}
noisy(Boolean)(0);




var myString = JSON.stringify({"name": "X", "born": 1980});
console.log(myString); // {"name":"X","born":1980}
console.log(JSON.parse(myString).born); // 1980




var ANCESTRY_FILE = "[\n  " + [
  '{"name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel"}',
  '{"name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme"}',
  '{"name": "Maria de Rycke", "sex": "f", "born": 1683, "died": 1724, "father": "Frederik de Rycke", "mother": "Laurentia van Vlaenderen"}',
  '{"name": "Jan van Brussel", "sex": "m", "born": 1714, "died": 1748, "father": "Jacobus van Brussel", "mother": "Joanna van Rooten"}',
  '{"name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"}',
  '{"name": "Jan Frans van Brussel", "sex": "m", "born": 1761, "died": 1833, "father": "Jacobus Bernardus van Brussel", "mother":null}',
  '{"name": "Pauwels van Haverbeke", "sex": "m", "born": 1535, "died": 1582, "father": "N. van Haverbeke", "mother":null}',
  '{"name": "Clara Aernoudts", "sex": "f", "born": 1918, "died": 2012, "father": "Henry Aernoudts", "mother": "Sidonie Coene"}',
  '{"name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm"}',
  '{"name": "Lieven de Causmaecker", "sex": "m", "born": 1696, "died": 1724, "father": "Carel de Causmaecker", "mother": "Joanna Claes"}',
  '{"name": "Pieter Haverbeke", "sex": "m", "born": 1602, "died": 1642, "father": "Lieven van Haverbeke", "mother":null}',
  '{"name": "Livina Haverbeke", "sex": "f", "born": 1692, "died": 1743, "father": "Daniel Haverbeke", "mother": "Joanna de Pape"}',
  '{"name": "Pieter Bernard Haverbeke", "sex": "m", "born": 1695, "died": 1762, "father": "Willem Haverbeke", "mother": "Petronella Wauters"}',
  '{"name": "Lieven van Haverbeke", "sex": "m", "born": 1570, "died": 1636, "father": "Pauwels van Haverbeke", "mother": "Lievijne Jans"}',
  '{"name": "Joanna de Causmaecker", "sex": "f", "born": 1762, "died": 1807, "father": "Bernardus de Causmaecker", "mother":null}',
  '{"name": "Willem Haverbeke", "sex": "m", "born": 1668, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
  '{"name": "Pieter Antone Haverbeke", "sex": "m", "born": 1753, "died": 1798, "father": "Jan Francies Haverbeke", "mother": "Petronella de Decker"}',
  '{"name": "Maria van Brussel", "sex": "f", "born": 1801, "died": 1834, "father": "Jan Frans van Brussel", "mother": "Joanna de Causmaecker"}',
  '{"name": "Angela Haverbeke", "sex": "f", "born": 1728, "died": 1734, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"}',
  '{"name": "Elisabeth Haverbeke", "sex": "f", "born": 1711, "died": 1754, "father": "Jan Haverbeke", "mother": "Maria de Rycke"}',
  '{"name": "Lievijne Jans", "sex": "f", "born": 1542, "died": 1582, "father":null, "mother":null}',
  '{"name": "Bernardus de Causmaecker", "sex": "m", "born": 1721, "died": 1789, "father": "Lieven de Causmaecker", "mother": "Livina Haverbeke"}',
  '{"name": "Jacoba Lammens", "sex": "f", "born": 1699, "died": 1740, "father": "Lieven Lammens", "mother": "Livina de Vrieze"}',
  '{"name": "Pieter de Decker", "sex": "m", "born": 1705, "died": 1780, "father": "Joos de Decker", "mother": "Petronella van de Steene"}',
  '{"name": "Joanna de Pape", "sex": "f", "born": 1654, "died": 1723, "father": "Vincent de Pape", "mother": "Petronella Wauters"}',
  '{"name": "Daniel Haverbeke", "sex": "m", "born": 1652, "died": 1723, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
  '{"name": "Lieven Haverbeke", "sex": "m", "born": 1631, "died": 1676, "father": "Pieter Haverbeke", "mother": "Anna van Hecke"}',
  '{"name": "Martina de Pape", "sex": "f", "born": 1666, "died": 1727, "father": "Vincent de Pape", "mother": "Petronella Wauters"}',
  '{"name": "Jan Francies Haverbeke", "sex": "m", "born": 1725, "died": 1779, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"}',
  '{"name": "Maria Haverbeke", "sex": "m", "born": 1905, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"}',
  '{"name": "Petronella de Decker", "sex": "f", "born": 1731, "died": 1781, "father": "Pieter de Decker", "mother": "Livina Haverbeke"}',
  '{"name": "Livina Sierens", "sex": "f", "born": 1761, "died": 1826, "father": "Jan Sierens", "mother": "Maria van Waes"}',
  '{"name": "Laurentia Haverbeke", "sex": "f", "born": 1710, "died": 1786, "father": "Jan Haverbeke", "mother": "Maria de Rycke"}',
  '{"name": "Carel Haverbeke", "sex": "m", "born": 1796, "died": 1837, "father": "Pieter Antone Haverbeke", "mother": "Livina Sierens"}',
  '{"name": "Elisabeth Hercke", "sex": "f", "born": 1632, "died": 1674, "father": "Willem Hercke", "mother": "Margriet de Brabander"}',
  '{"name": "Jan Haverbeke", "sex": "m", "born": 1671, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
  '{"name": "Anna van Hecke", "sex": "f", "born": 1607, "died": 1670, "father": "Paschasius van Hecke", "mother": "Martijntken Beelaert"}',
  '{"name": "Maria Sturm", "sex": "f", "born": 1835, "died": 1917, "father": "Charles Sturm", "mother": "Seraphina Spelier"}',
  '{"name": "Jacobus Bernardus van Brussel", "sex": "m", "born": 1736, "died": 1809, "father": "Jan van Brussel", "mother": "Elisabeth Haverbeke"}'
].join(",\n  ") + "\n]";

// This makes sure the data is exported in node.js
// `require(./path/to/ancestry.js)` will get you the array.
if (typeof module != "undefined" && module.exports)
  module.exports = ANCESTRY_FILE;


var ancestry = JSON.parse(ANCESTRY_FILE);
console.log(ancestry.length); // 39



function filter(array, test) {
    var passed = [];
    for (var i = 0; i < array.length; i++) {
	if (test(array[i])) {
	    passed.push(array[i]);
	    console.log(array[i]);
	}
    }
    return passed;
}


console.log(filter(ancestry, function(person) {
    return person.born > 1900 && person.born < 1925;
}));


// There is a builtin function for arrays called filter that cam be used.

console.log(ancestry.filter(function(person) {
    return person.father == "Carel Haverbeke";
}));


function map(array, transform) {
    var mapped = [];
    for (var i = 0; i < array.length; i++){
	mapped.push(transform(array[i]));
    }
    return mapped;
}


var overNinety = ancestry.filter(function(person) {
    return person.died - person.born > 90;
});
console.log(map(overNinety, function(person) {
    return person.name;
}));




// N.B. Like forEach and filter, map is also a standard method on arrays.





function reduce(array, combine, start) {
    var current = start;
    for (var i = 0; i < array.length; i++) {
	current = combine(current, array[i]);
    }
    return current;
}


// returns 10
console.log(reduce([1,2,3,4], function(a,b) {
    return a + b;
}, 0));



// reduce is also a standard method on arrays

console.log(ancestry.reduce(function(min, cur) {
    if (cur.born < min.born)
	return cur;
    else
	return min;
}));
    


// An alternate method for finding the minimum birth year that doesn't use
// higher order functions

function getOldest(ancestryArray) {
    var min = ancestryArray[0];
    for (var i = 0; i < ancestryArray.length; i++) {
	if (ancestryArray[i].born < min.born)
	    min = ancestryArray[i];
    }
    return min;
}



// COMPOSITION OF FUNCTIONS

function average(array) {
    function plus(a,b) { return a + b; }
    return array.reduce(plus) / array.length;
}

function age(p) { return p.died - p.born; }
function male(p) { return p.sex == "m"; }
function female(p) { return p.sex == "f"; }

console.log(average(ancestry.filter(male).map(age)));  // 61.666666666666664
console.log(average(ancestry.filter(female).map(age)));  // 54.55555555555556



var byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});

console.log(byName["Philibert Haverbeke"]);





function reduceAncestors(person, f, defaultValue) {
    function valueFor(person) {
	if (person == null)
	    return defaultValue;
	else
	    return f(person, valueFor(byName[person.mother]),
		     valueFor(byName[person.father]));
    }
    return valueFor(person);
}



function sharedDNA(person, fromMother, fromFather) {
    if (person.name == "Pauwels van Haverbeke")
	return 1;
    else
	return (fromMother + fromFather) / 2;
}
var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);   // 0.00048828125



// An alternate version of calculating
function countAncestors(person, test) {
    function combine(current, fromMother, fromFather) {
	var thisOneCounts = current != person && test(current);
	return fromMother + fromFather + (thisOneCounts ? 1 : 0);
    }
    return reduceAncestors(person, combine, 0);
}


function longLivingPercentage(person) {
    var all = countAncestors(person, function(person) {
	return true;
    });

    var longLiving = countAncestors(person, function(person) {
	return (person.died - person.born) >= 70;
    });

    return longLiving / all;
}

console.log(longLivingPercentage(byName["Emile Haverbeke"]));  // 0.12962962962962962




// Binding

var theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"];

function isInSet(set, person) {
    return set.indexOf(person) > -1;
}


console.log(ancestry.filter(function(person) {
    return isInSet(theSet, person);
}));

console.log(ancestry.filter(isInSet.bind(null, theSet)));





/*********************************************************************
* Exercises
**********************************************************************/

// Exercise 1: Flattening
/*
Use the reduce method in combination with the concat method to "flatten"
an array of arrays into a single array that has all the elements of the input
arrays.
*/

// function concatArrays(theArrays) {
//     var newArray = reduce(theArrays, function(a,b) {
// 	return concat(a,b);
//     }, 0);
//     return newArray;
// }

// function concatArrays(theArrays) {
//     var newArray = [];
//     for (var i = 0; i < theArrays.length; i++) {
// 	newArray.push(theArrays[i].reduce(function(a,b) {
// 	    return concat(a,b);
// 	}));
//     }
//     return newArray;
// }


function concatArrays(theArrays) {
    return theArrays.reduce(function(a,b) {
	return a.concat(b);
    });
}

var arrays = [[1, 2, 3], [4, 5], [6]];
// var arrays = [[1, 2, 3], [4, 5], [6]];
console.log(concatArrays(arrays));


// Exercise 2: Mother-Child Age Difference:

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});


function avgMCDiff() {
    var Ma;
    var ageArr = [];
    ancestry.forEach(function(person) {
	Ma = byName[person.mother];
	if (Ma)
	    ageArr.push(person.born - Ma.born);
    });
    return average(ageArr);
}


console.log(avgMCDiff());

/*
The book's code for this exercise (my code above does work, but the book's code
was a bit more elegant.

var differences = ancestry.filter(function(person) {
  return byName[person.mother] != null;
}).map(function(person) {
  return person.born - byName[person.mother].born;
});

console.log(average(differences));

*/



// Exercise 3: Historical Life Expectancy

/*
Instructions:

When we looked up all the people in our data set that lived more than
90 years, only the latest generation in the data came out. Let's take a
closer look at that phenomenon.

Compute and output the average age of the people in the ancestry data
set per century. A person is assigned to a century by taking their year
of death, dividing it by 100, and rounding it up, as in Math.ceil(person.
died / 100).

For bonus points, write a function groupBy that abstracts the grouping
operation. It should accept as arguments an array and a function that
computes the group for an element in the array and returns an object
that maps group names to arrays of group members.

*/


// function startHere() {
//     // var result = ancestry.map(function(person) {
//     // 	Math.ceil(person.died / 100);
//     // });

//     var result = ancestry.map(function(person) {
// 	return Math.ceil(person.died / 100);
//     });

//     return result;
// }




function groupBy(theArray, groupFunc) {
    // var result = theArray.map(groupFunc);
    var groups = {};
    var groupName;

    theArray.forEach(function(element) {
	groupName = groupFunc(element);
	if (groupName in groups)
	    groups[groupName].push(element);
	else
	    groups[groupName] = [element];
    });
    return groups;		
}


var byCentury = groupBy(ancestry, function(person) {
    return Math.ceil(person.died / 100);
});



function runIt() {
    for (var century in byCentury) {
	var ages = byCentury[century].map(function(person) {
	    return person.died - person.born;
	});
	console.log(century + " : " + average(ages));				  
    }
}

	
console.log(runIt());




// Exercise 4: Every and Then Some

/*
Arrays also come with the standard methods every and some. Both take a
predicate function that, when called with an array element as argument,
returns true or false. Just like && returns a true value only when the
expressions on both sides are true, every returns true only when the
predicate returns true for all elements of the array. Similarly, some returns
true as soon as the predicate returns true for any of the elements. They
do not process more elements than necessary - for example, if some finds
that the predicate holds for the first element of the array, it will not look
at the values after that.

Write two functions, every and some, that behave like these methods,
except that they take the array as their first argument rather than being
a method.

*/


function every(theArray, thePredicate) {
    var result = true;

    for (var i = 0; i < theArray.length; i++) {
	result = thePredicate(theArray[i]);
	if (!result)
	    return false;
    }
    return result;
}


function some(theArray, thePredicate) {
    var result = false;

    for (var i = 0; i < theArray.length; i++) {
	result = thePredicate(theArray[i]);
	if (result)
	    return true;
    }
    return result;
}




