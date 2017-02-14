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



