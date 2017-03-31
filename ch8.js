// DEBUGGING AND ERROR HANDLING

function canYouSpotTheProblem() {
    "use strict";
    for (counter = 0; counter < 10; counter++)
	console.log("Happy happy");
}

canYouSpotTheProblem()  // ReferenceError: counter is not defined


// Since we used "use strict", we need to declare counter
// i.e. for (var counter = 0; counter < 10; counter++)


function Person(name) {
    this.name = name;
}
var Ferdinand = Person("Ferdinand");  // oops - forgot the call to new
console.log(name);                    // Ferdinand


// If we "use strict" here, then

"use strict";
function Person(name) {
    this.name = name;
}

var Ferdinand = Person("Ferdinand");   // Forgot the call to new
// TypeError: Cannot set property 'name' of undefined





// TESTING

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};


// Now test the above function (class)
function testVector() {
    var p1 = new Vector(10, 20);
    var p2 = new Vector(-10, 5);
    var p3 = p1.plus(p2);

    if (p1.x !== 10) return "fail: p1 x property";
    if (p1.y !== 20) return "fail: p1 y property";
    if (p2.x !== -10) return "fail: negative x property";
    if (p2.y !== 5) return "fail: p2 y property";
    if (p3.x !== 0) return "fail: x from plus";
    if (p3.y !== 25) return "fail: y from plus";
}

console.log(testVector());
// everything ok






