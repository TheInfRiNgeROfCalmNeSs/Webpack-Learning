// Decorator Pattern
// Constructor
let Person = function (name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
}

let uniqueBob = new Person('Bob');

// the array might be added without Person constructor modification
uniqueBob.hobbies = ['Cooking', 'Running'];
uniqueBob.greet = function() {
  Person.prototype.greet.call(this);				// outputs -> Hello, my name is Bob
  console.log('My hobbies are: ', this.hobbies);	// outputs -> My hobbies are: ['Cooking', 'Running']
};

uniqueBob.greet();

// Another way to do that
let CoolPerson = function(name, catchPhrase) {
  Person.call(this, name);
  this.catchPhrase = catchPhrase;
};

// assigning Person prototype to CoolPerson prototype
CoolPerson.prototype = Object.create(Person.prototype);

// Person's prototype modification
CoolPerson.prototype.greet = function() {
  Person.prototype.greet.call(this);				// outputs -> Hello, my name is Jeff
  console.log(this.catchPhrase);					// outputs -> Aaaayyy
};

let coolDude = new CoolPerson('Jeff', 'Aaaayyy');
console.log(coolDude);								// {name: 'Jeff', catchPhrase: 'Aaaayyy'}
coolDude.greet();									// —^ 