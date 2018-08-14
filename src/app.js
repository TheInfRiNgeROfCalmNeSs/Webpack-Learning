"use strict"

var array = [1];
var other = concat(array, 2, [3], [[4]]);

console.log(other);
// => [1, 2, 3, [4]]
