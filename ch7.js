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


