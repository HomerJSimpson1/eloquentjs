
// First exercise - "Looping a Triangle"
/*
for (var countr = 0; countr < 7; countr++) {
    for (var counter = 0; counter <= countr; counter++) {
	console.log("#");
    }
    console.log("\n");
}
*/

for(var hashString = "#"; hashString.length < 8; hashString += "#") {
    console.log(hashString);
}



// Second Exercise - "FizzBuzz"
for(var indx = 1; indx < 101; indx++) {
    if (((indx % 3) == 0) && ((indx % 5) == 0)) {
	console.log("FizzBuzz");
    }
    else if ((indx % 3) == 0) {
	console.log("Fizz");
    }
    else if((indx % 5) == 0) {
	console.log("Buzz");
    }
    else {
	console.log(indx);
    }
}



// Third Exercise - "Chess Board"
var myChessBoard = function(size) {
    var chBoard = "";
    for (var row = 0; row < size; row++) {
	for (var col = 0; col < size; col++) {
	    if ((row + col) % 2 == 0) {
		// console.log(" ");
		chBoard += " ";
	    }
	    else {
		// console.log("#");
		chBoard += " ";		
	    }
	} // end inner for loop
	
	chBoard += "\n";
    } // end outer for loop

    console.log(chBoard);

    return chBoard;
} // end function definition for chessBoard
