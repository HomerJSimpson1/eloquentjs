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



