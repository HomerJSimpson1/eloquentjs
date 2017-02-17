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


function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    function drawLine(blocks, lineNo) {
	return blocks.map(function(block) {
	    return block[lineNo];
	}).join(" ");
    }

    function drawRow(row, rowNum) {
	var blocks = row.map(function(cell, colNum) {
	    return cell.draw(widths[colNum], heights[rowNum]);
	});
	return blocks[0].map(function(_, lineNo) {
	    return drawLine(blocks, lineNo);
	}).join("\n");
    }

    return rows.map(drawRow).join("\n");
}


function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++) {
	result += string;
    }
    return result;
}

// Constructor
function TextCell(text) {
    this.text = text.split("\n");
}

TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line) {
	return Math.max(width, line);
    }, 0);
};

TextCell.prototype.minHeight = function() {
    return this.text.length;
};

TextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
	var line = this.text[i] || "";
	result.push(line + repeat(" ", width - line.length));
    }
    return result;
};



var rows = [];
for (var i = 0; i < 5; i++) {
    var row = [];
    for (var j = 0; j < 5; j++) {
	if ((j + i) % 2 == 0)
	    row.push(new TextCell("##"));
	else
	    row.push(new TextCell("  "));
    }
    rows.push(row);
}

console.log(drawTable(rows));

// Constructor
function UnderlinedCell(inner) {
    this.inner = inner;
}

UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth;
};

UnderlinedCell.prototype.minHeight = function() {
    return this.inner.minHeight + 1;
};

UnderlinedCell.prototype.draw = function(width, height) [
    return this.inner.draw(width, height - 1).concat([repeat("-", width)]);
};


function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name) {
	return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function(row) {
	return keys.map(function(name) {
	    return new TextCell(String(row[name]));
	});
    });
    return [headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));




// GETTERS AND SETTERS

var pile = {
    elements: ["eggshell", "orange peel", "worm"],
    get height() {
	return this.elements.length();
    },
    set height(value) {
	console.log("Ignoring attempt to set height to ", value);
    }
};

console.log(pile.height);  // 3
pile.height = 100;         // Ignoring attempt to set height to 100


Object.defineProperty(TextCell.prototype, "heightProp", {
    get: function() { return this.text.length; }
});

var cell = new TextCell("no\nway");
console.log(cell.heightProp);         // 2

cell.heightProp = 100;
console.log(cell.heightProp);         // 2


// INHERITANCE

function RTextCell(text) {
    TextCell.call(this, text);
}

RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
	var line = this.text[i] || "";
	result.push(repeat(" ", width - line.length) + line);
    }
    return result;
};


function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name) {
	return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function(row) {
	return keys.map(function(name) {
	    var value = row[name];
	    // The following line was changed
	    if (typeof value == "number")
		return new RTextCell(String(value));
	    else
		return new TextCell(String(value));
	});
    });
    return [headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));   // ... a beautifully aligned table



// instanceof() FUNCTION

console.log(new RTextCell("A") instanceof RTextCell);   // true
console.log(new RTextCell("A") instanceof TextCell);    // true
console.log(new TextCell("A") instanceof RTextCell);    // false
console.log([1] instanceof Array);                      // true



// EXERCISES

// Exercise 1: A Vector Type

/*
A vector type
Write a constructor Vector that represents a vector in two-dimensional
space. It takes x and y parameters (numbers), which it should save to
properties of the same name.
Give the Vector prototype two methods, plus and minus, that take another
vector as a parameter and return a new vector that has the sum
or difference of the two vectors' (the one in this and the parameter) x
and y values.
Add a getter property length to the prototype that computes the length
of the vector - that is, the distance of the point (x, y) from the origin (0,
0).
*/

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(addend) {
    return new Vector(this.x + addend.x, this.y + addend.y);
};

Vector.prototype.minus = function(subtrahend) {
    return new Vector(this.x - subtrahend.x, this.y - subtrahend.y);
};

Object.defineProperty(Vector.prototype, "length", {
    get: function() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); }
});



// Exercise 2: Another Cell

/*
Another cell
Implement a cell type named StretchCell(inner, width, height) that conforms
to the table cell interface described earlier in the chapter. It should
wrap another cell (like UnderlinedCell does) and ensure that the resulting
cell has at least the given width and height, even if the inner cell would
naturally be smaller.

*/


function StretchCell(inner, width, height) {
    this.inner = inner;
    this.width = width;
    this.height = height;
}

StretchCell.prototype.minWidth = function() {
    if (this.inner.minWidth() >= this.width) {
	console.log(this.inner.minWidth());
	return this.inner.minWidth();
    }
    else
	return this.width;
};

StretchCell.prototype.minHeight = function() {
    if (this.inner.minHeight() >= this.height)
	return this.inner.minHeight();
    else
	return this.height;
};

StretchCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height);
};








// Exercise 3: Sequence Interface


/*
Sequence interface
Design an interface that abstracts iteration over a collection of values.
An object that provides this interface represents a sequence, and the
interface must somehow make it possible for code that uses such an
object to iterate over the sequence, looking at the element values it is
made up of and having some way to find out when the end of the sequence
is reached.
When you have specified your interface, try to write a function logFive
that takes a sequence object and calls console.log on its first five elements -
or fewer, if the sequence has fewer than five elements.
Then implement an object type ArraySeq that wraps an array and allows
iteration over the array using the interface you designed. Implement
another object type RangeSeq that iterates over a range of integers (taking
from and to arguments to its constructor) instead.

*/






