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





