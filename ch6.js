var rabbit = {};

rabbit.speak = function(line) {
    console.log("The rabbit says '" + line + "'");
};

rabbit.speak("I'm alive.");  // The rabbit says 'I'm alive.'


function speak(line) {
    console.log("The " + this.type + " rabbit says '" + line + "'");
}

var whiteRabbit = { type: "white", speak: speak };
var fatRabbit = { type: "fat", speak: speak };

whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!");
// The white rabbit says 'Oh my ears and whiskers, how late it's getting!'
fatRabbit.speak("I could sure use a carrot right now.");
// The fat rabbit says 'I could sure use a carrot right now.'


// apply versus call:

speak.apply(fatRabbit, ["Burp!"]);    // The fat rabbit says 'Burp!'
speak.call({type: "old"}, "Oh my.");  // The old rabbit says 'Oh my.'



// PROTOTYPES

var empty = {};
console.log(empty.toString);  // Prints to the console the function definition
console.log(empty.toString());  // Prints to the console the object empty as a string

console.log(Object.getPrototypeOf({}) == Object.prototype);  // true

console.log(Object.getPrototypeOf(Object.prototype));        // null

console.log(Object.getPrototypeOf(isNaN) == Function.prototype);  // true

console.log(Object.getPrototypeOf([]) == Array.prototype);   // true


var protoRabbit = {
    speak: function(line) {
	console.log("The " + this.type + " rabbit says '" + line + "'");
    }
};

var killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");     // The killer rabbit says 'SCREEEE!'




// CONSTRUCTORS

function Rabbit(type) {
    this.type = type;
}

var killerRabbit = new Rabbit("killer");
var blackRabbit = new Rabbit("black");
console.log(blackRabbit.type);    // black


Rabbit.prototype.speak = function(line) {
    console.log("The " + this.type + " rabbit says '" + line + "'");
};

blackRabbit.speak("Doom ...");         // The black rabbit says 'Doom ...'



// Overriding Derived Properties

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);          // small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);          // long, sharp, and bloody
console.log(blackRabbit.teeth);           // small
console.log(Rabbit.prototype.teeth);      // small


console.log(Array.prototype.toString == Object.prototype.toString) // false

console.log([1, 2].toString());     // 1,2
console.log(Object.prototype.toString.call([1, 2]));  // [object Array]



// PROTOTYPE INTERFERENCE

/*
A prototype can be used at any time to add new properties and methods
to all objects based on it. For example, it might become necessary for
our rabbits to dance.
*/

Rabbit.prototype.dance = function() {
    console.log("The " + this.type + " rabbit dances a jig.");
};

killerRabbit.dance();      //The killer rabbit dances a jig.


var map = {};
function storePhi(event, phi) {
    map[event] = phi;
}

storePhi("pizza", 0.069);
storePhi("touched tree", -0.081);

Object.prototype.nonsense = "hi";    // adds an enumerable property "nonsense"
for (var name in map) {
    console.log(name);
}
// pizza
// touched tree
// nonsense

console.log("nonsense" in map);  // true
console.log("toString" in map);  // true

// Delete the problematic property
delete Object.prototype.nonsense;

// Adds a nonenumerable property "hiddenNonsense"
Object.defineProperty(Object.prototype, "hiddenNonsense", {enumerable: false, value: "hi"});

for (var name in map) {
    console.log(name);
}

// pizza
// touched tree

console.log(map.hiddenNonsense);
// hi

// However, this will still show up using the "in" operator.
// If instead we use hasOwnProperty, then derived properties will not be listed.

console.log(map.hasOwnProperty("toString"));    // false

// So, for the future, usually better to use "hasOwnProperty" rather than "in", e.g.
for (var name in map) {
    if (map.hasOwnProperty(name)) {
	// ... this is an own property
    }
}


// PROTOTYPE-LESS OBJECTS

var map = Object.create(null);
map["pizza"] = 0.0659;
console.log("toString" in map); // false
console.log("pizza" in map);    // true




// LAYING OUT A TABLE

function rowHeights(rows) {
    return rows.map(function(row) {
	return row.reduce(function(max,cell) {
	    return Math.max(max, cell.minHeight());
	}, 0);
    });
}


function colWidths(rows) {
    return rows[0].map(function(_, i) {
	return rows.reduce(function(max, row) {
	    return Math.max(max, row[i].minWidth());
	}, 0);
    });
}


/*
// Used the following functions to test how colWidths works.

var rows = [];

for (var i = 0; i < 3; i++) {
    var row = [];
    for (var j = 0; j < 3; j++) {
        var repeatNum = ((i * j + 1) % 4) + i;
        row.push("a".repeat(repeatNum));
    }
    rows.push(row);
}

// rows ends up as the following string array (2D array)

[['a',   'a',     'a'   ], 
 ['aa',  'aaa',   'aaaa'], 
 ['aaa', 'aaaaa', 'aaa' ]]

function colWidths(rows) {
    return rows[0].map(function(_, i) {
		return rows.reduce(function(max, row) {
	    	console.log(row[i].length);
		}, 0);
    });
}

console.log(colWidths(rows));

// This yields the following:
// 1, 2, 3, 1, 3, 5, 1, 4, 3

// This demonstrates that the colWidths function traverses the array in column order.
// So it reduces each column to the widest element.

*/


