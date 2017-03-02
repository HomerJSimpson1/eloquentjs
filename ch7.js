// Chapter 7: Project - Electronic Life

/*
Our project in this chapter is to build a virtual ecosystem, a little world
populated with critters that move around and struggle for survival.

Definition:
To make this task manageable, we will radically simplify the concept
of a world. Namely, a world will be a two-dimensional grid where each
entity takes up one full square of the grid. On every turn, the critters
all get a chance to take some action.

Thus, we chop both time and space into units with a fixed size: squares
for space and turns for time. Of course, this is a somewhat crude and
inaccurate approximation. But our simulation is intended to be amusing,
not accurate, so we can freely cut such corners.

We can define a world with a plan, an array of strings that lays out
the world's grid using one character per square.

The "#" characters in this plan represent walls and rocks, and the "o"
characters represent critters. The spaces, as you might have guessed, are
empty space.

A plan array can be used to create a world object. Such an object keeps
track of the size and content of the world. It has a toString method, which
converts the world back to a printable string (similar to the plan it was
based on) so that we can see what's going on inside. The world object
also has a turn method, which allows all the critters in it to take one turn
and updates the world to reflect their actions.
*/

var plan = [ "############################" ,
	     "#      #    #      o      ##" ,
	     "#                          #" ,
	     "#          #####           #" ,
	     "##         #   #    ##     #" ,
	     "###           ##     #     #" ,
	     "#           ###      #     #" ,
	     "#   ####                   #" ,
	     "#   ##       o             #" ,
	     "# o  #         o       ### #" ,
	     "#    #                     #" ,
	     "############################" ] ;
	     


// Representing Space

/*
The grid that models the world has a fixed width and height. Squares
are identified by their x- and y-coordinates. We use a simple type, Vector
(as seen in the exercises for the previous chapter), to represent these
coordinate pairs.

 */


function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};


/*

Next, we need an object type that models the grid itself. A grid is part
of a world, but we are making it a separate object (which will be a
property of a world object) to keep the world object itself simple. The
world should concern itself with world-related things, and the grid should
concern itself with grid-related things.

When calling the Array constructor with a single number as an argument, it 
creates a new empty array of the given length.

This code defines the Grid object, with some basic methods:
*/

function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}

Grid.prototype.isInside = function(vector) {
    return (vector.x >= 0 && vector.x < this.width &&
	    vector.y >= 0 && vector.y < this.height);
};

Grid.prototype.get = function(vector) {
    return this.space[vector.x + this.width * vector.y];
};

Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};

// And here is a trivial test:

var grid = new Grid(5,5);
console.log(grid.get(new Vector(1,1)));    // undefined
grid.set(new Vector(1,1), "X");
console.log(grid.get(new Vector(1,1)));    // X


var directions = {
    "n": new Vector(0, -1),
    "ne": new Vector(1, -1),
    "e": new Vector(1, 0),
    "se": new Vector(1, 1),
    "s": new Vector(0, 1),
    "sw": new Vector(-1, 1),
    "w": new Vector(-1, 0),
    "nw": new Vector(-1, -1)
};


function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
    this.direction = randomElement(directionNames);
}

BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != " ") {
	this.direction = view.find(" ") || "s";
    }
    return {type: "move", direction: this.direction};
};


function elementFromChar(legend, ch) {
    if (ch == " ")
	return null;

    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}

function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y) {
	for (var x = 0; x < line.length; x++)
	    grid.set(new Vector(x,y), elementFromChar(legend, line[x]));
    });
}


function charFromElement(element) {
    if (element == null)
	return " ";
    else
	return element.originChar;
}

World.prototype.toString = function() {
    var output = "";
    for (var y = 0; y < this.grid.height; y++) {
	for (var x = 0; x < this.grid.width; x++) {
	    var element = this.grid.get(new Vector(x,y));
	    output += charFromElement(element);
	}
	output += "\n";
    }
    return output;
};

// No function body needed
function Wall() {}


var world = new World(plan, {"#": Wall, "o": BouncingCritter});
console.log(world.toString());


/*
// this and its prototype:

The World constructor contains a call to forEach. One interesting thing
to note is that inside the function passed to forEach, we are no longer
directly in the function scope of the constructor. Each function call gets
its own this binding, so the this in the inner function does not refer to
the newly constructed object that the outer this refers to. In fact, when
a function isn't called as a method, this will refer to the global object.
This means that we can't write this.grid to access the grid from inside
the loop. Instead, the outer function creates a normal local variable,
grid, through which the inner function gets access to the grid.

This is a bit of a design blunder in JavaScript. Fortunately, the next
version of the language provides a solution for this problem. Meanwhile,
there are workarounds. A common pattern is to say var self = this and
from then on refer to self, which is a normal variable and thus visible to
inner functions.

Another solution is to use the bind method, which allows us to provide
an explicit this object to bind to.


var test = {
    prop: 10,
    addPropTo: function(array) {
	return array.map(function(elt) {
	    return this.prop + elt;
	}.bind(this));
    }
};
console.log(test.addPropTo([5]));   // [15]


The function passed to map is the result of the bind call and thus has its
this bound to the first argument given to bind-the outer function's this
value (which holds the test object).

Most standard higher-order methods on arrays, such as forEach and map,
take an optional second argument that can also be used to provide a this
for the calls to the iteration function. So you could express the previous
example in a slightly simpler way.


var test = {
    prop: 10,
    addPropTo: function(array) {
	return array.map(function(elt) {
	    return this.prop + elt;
	}, this);  // no bind statement here
    }
};

This works only for higher-order functions that support such a context
parameter. When they don't, you'll need to use one of the other approaches.
In our own higher-order functions, we can support such a context parameter
by using the call method to call the function given as an argument.

For example, here is a forEach method for our Grid type, which calls
a given function for each element in the grid that isn't null or undefined:


Grid.prototype.forEach = function(f, context) {
    for (var y = 0; y < this.height; y++) {
	for (var x = 0; x < this.width; x++) {
	    var value = this.space[x + y * this.width];
	    if (value != null)
		f.call(context, value, new Vector(x,y));
	}
    }
};

*/

Grid.prototype.forEach = function(f, context) {
    for (var y = 0; y < this.height; y++) {
	for (var x = 0; x < this.width; x++) {
	    var value = this.space[x + y * this.width];
	    if (value != null)
		f.call(context, value, new Vector(x,y));
	}
    }
};


World.prototype.turn = function() {
    var acted = [];
    this.grid.forEach(function(critter, vector) {
	// console.log("critter: " + critter);
	// console.log("vector: " + vector);
	if (critter.act && acted.indexOf(critter) == -1) {
	    acted.push(critter);
	    this.letAct(critter, vector);
	}
    }, this);
};


World.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type == "move") {
	var dest = this.checkDestination(action, vector);
	if (dest && this.grid.get(dest) == null) {
	    this.grid.set(vector, null);
	    this.grid.set(dest, critter);
	}
    }
};


World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
	var dest = vector.plus(directions[action.direction]);
	if (this.grid.isInside(dest))
	    return dest;
    }
};


function View(world, vector) {
    this.world = world;
    this.vector = vector;
}


View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target))
	return charFromElement(this.world.grid.get(target));
    else
	return "#";
};

View.prototype.findAll = function(ch) {
    var found = [];
    for (var dir in directions) {
	if (this.look(dir) == ch)
	    found.push(dir);
    }
    return found;
}

View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length == 0)
	return null;
    return randomElement(found);
};


for (var i = 0; i < 5; i++) {
    world.turn();
    console.log(world.toString());
}





// MORE LIFE FORMS

function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}


function WallFollower() {
    this.dir = "s";
}


WallFollower.prototype.act = function(view) {
    var start = this.dir;
    if (view.look(dirPlus(this.dir, -3)) != " ") {
	// scan to the left only if you've just passed an obstacle.
	start = this.dir = dirPlus(this.dir, -2);
    }
    while (view.look(this.dir) != " ") {
	this.dir = dirPlus(this.dir, 1);
	// Prevent infinite loop. If we've looked in every direction
	// and there are no empty spaces, then stop.
	if (this.dir == start)
	    break;
    }
    return {type: "move", direction: this.dir };
};


// Use inheritance - inherit from World object
// Create Constructor for LifelikeWorld
function LifelikeWorld(map, legend) {
    // call the super's constructor
    World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(World.prototype);

var actionTypes = Object.create(null);

// Override the World letAct function
LifelikeWorld.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    var handled = action && action.type in actionTypes &&
	actionTypes[action.type].call(this, critter, vector, action);

    /*
    // Next if statement for debugging only
    if (critter instanceof PlantEater)
	console.log("Plant eater taking action " + action.type);
    */
    
    if (!handled) {
	// If the action didn't work, then wait.
	// While waiting, decrease the critter's energy level
	critter.energy -= 0.2;
	if (critter.energy <= 0) {
	    // if the critter runs out of energy, it dies
	    this.grid.set(vector, null);
	}
    }
};



actionTypes.grow = function(critter) {
    critter.energy += 0.5;
    return true;
};


/*
actionTypes.move = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    if (dest == null || critter.energy <=1 || this.grid.get(dest) != null)
	return false;
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
};
*/


actionTypes.move = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    if (dest == null || critter.energy <=1 || this.grid.get(dest) != null)
	return false;
    critter.energy -= 0.5;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
};


actionTypes.eat = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    var atDest = dest != null && this.grid.get(dest);
    if (!atDest || atDest.energy == null)
	return false;
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};



actionTypes.reproduce = function(critter, vector, action) {
    var baby = elementFromChar(this.legend, critter.originChar);
    var dest = this.checkDestination(action, vector);

    if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null) {
	return false;
    }

    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);

    return true;
};



// POPULATING THE NEW WORLD

// Plants are represented by an asterisk ("*")
// PlantEaters are represented by an "o"
// Walls are represented by a pound symbol (aka hashtag) ("#")

// Plant constructor
function Plant() {
    this.energy = 3 + Math.random() * 4;
}


Plant.prototype.act = function(view) {
    if (this.energy > 15) {
	var space = view.find(" ");
	if (space)
	    return {type: "reproduce", direction: space};
    }
    if (this.energy < 20)
	return {type: "grow"};
};



function PlantEater() {
    this.energy = 20;
}


PlantEater.prototype.act = function(view) {
    var space = view.find(" ");
    if (this.energy > 60 && space)
	return {type: "reproduce", direction: space};
    var plant = view.find("*");
    if (plant)
	return {type: "eat", direction: plant};
    if (space)
	return {type: "reproduce", direction: space};
};


// BRINGING IT TO LIFE

var valley = new LifelikeWorld(
    ["############################",
     "#####                 ######",
     "##   ***                **##",
     "#   *##**         **  o  *##",
     "#    ***      o   ##**    *#",
     "#       o         ##***    #",
     "#                 ##**     #",
     "#   o        #*            #",
     "#*           #**      o    #",
     "#***         ##**    o   **#",
     "##****      ###***      *###",
     "############################"],
    {"#": Wall,
     "o": PlantEater,
     "*": Plant}
);


// Run the simulation:

/*
var num_iterations = 50;
for (var i = 0; i < num_iterations; i++) {
    valley.turn();
    //console.log(valley.toString());
    // Print fewer iterations...
    if ((i % 10) == 0)
	console.log(valley.toString());    
}
*/

var numIterations = 1000;
//var numToPrint = num_iterations / 10;
var numToPrint = 10;
var numModulo = numIterations / numToPrint;
for (var i = 0; i < numIterations; i++) {
    valley.turn();
    // Print fewer iterations...
    if ((i % numModulo) == 0)
	console.log(valley.toString());    
}




// EXERCISES

// Exercise 7.1: Artificial Stupidity
/*
Artificial stupidity

Having the inhabitants of our world go extinct after a few minutes is
kind of depressing. To deal with this, we could try to create a smarter
plant eater.

There are several obvious problems with our herbivores. First, they
are terribly greedy, stuffing themselves with every plant they see until
they have wiped out the local plant life. Second, their randomized movement
(recall that the view.find method returns a random direction when
multiple directions match) causes them to stumble around ineffectively
and starve if there don't happen to be any plants nearby. And finally,
they breed very fast, which makes the cycles between abundance and
famine quite intense.

Write a new critter type that tries to address one or more of these
points and substitute it for the old PlantEater type in the valley world.
See how it fares. Tweak it some more if necessary.

*/


var numPE = 0;
function PlantEater2() {
    this.energy = 20;
    this.numOffspring = 0;
    numPE++;
}

// var maxOffspring = 5;
var maxOffspring = 250;

PlantEater2.prototype.act = function(view) {
    var space = view.find(" ");
    if (this.energy > 60 && space && this.numOffspring++ < maxOffspring) {
	//this.numOffspring++;
	if (this.numOffspring > 0.5 * maxOffspring)
	    console.log(this.numOffspring);
	return {type: "reproduce", direction: space};
    }
    var plant = view.find("*");
    //    if (plant && this.energy < 120)
    if (plant){
	if (this.energy < 120)
	    return {type: "eat", direction: plant};
	else
	    this.energy -= 0.5;
    } // end if (plant)
    if (space && this.numOffspring++ < maxOffspring)
	return {type: "reproduce", direction: space};
};


var valley2 = new LifelikeWorld(
    ["############################",
     "#####                 ######",
     "##   ***                **##",
     "#   *##**         **  o  *##",
     "#    ***      o   ##**    *#",
     "#       o         ##***    #",
     "#                 ##**     #",
     "#   o        #*            #",
     "#*           #**      o    #",
     "#***         ##**    o   **#",
     "##****      ###***      *###",
     "############################"],
    {"#": Wall,
     "o": PlantEater2,
     "*": Plant}
);


var numIterations = 1000;
var numToPrint = 10;
var numModulo = numIterations / numToPrint;
for (var i = 0; i < numIterations; i++) {
    valley2.turn();
    // Print fewer iterations...
    if ((i % numModulo) == 0)
	console.log(valley2.toString());    
}




// Exercise 7.2: Predators

/*

Predators

Any serious ecosystem has a food chain longer than a single link. Write
another critter that survives by eating the herbivore critter. You'll notice
that stability is even harder to achieve now that there are cycles
at multiple levels. Try to find a strategy to make the ecosystem run
smoothly for at least a little while.

One thing that will help is to make the world bigger. This way, local
population booms or busts are less likely to wipe out a species entirely,
and there is space for the relatively large prey population needed to
sustain a small predator population.

*/


// This solution below really sucks.  Look at the book's solution - it's nice.

function Predator() {
    this.energy = 100;
}


Predator.prototype.act = function(view) {
    var space = view.find(" ");
    if (this.energy > 100 & space) {
	return { type: "reproduce", direction: space };
    }
    var plant = view.find("*");
    if (plant) {
	if (this.energy < 20)
  	    return { type: "eat", direction: plant};
	else
	    return { type: "move", direction: plant};
    }
	
    var herbivore = view.find("O");
    if (herbivore) {
	if (this.energy < 300)
	    return { type: "eat", direction: herbivore };
	else
	    this.energy -= 1;
    }
    if (space) {
	if (this.energy < 80)
	    return {type: "move", direction: space};
    }
}




var animateWorld = new LifelikeWorld(
    ["############################",
     "#####    @            ######",
     "##   ***                **##",
     "#   *##**  O**    **  O  *##",
     "#    ***      O   ##**    *#",
     "#@      O         ##***    #",
     "#                 ##**     #",
     "#   O        #*            #",
     "#*           #**      O    #",
     "#***    @    ##**    O   **#",
     "##****      ###***      *###",
     "############################"],
    {"#": Wall,
     "O": PlantEater2,
     "*": Plant,
     "@": Tiger}
);
