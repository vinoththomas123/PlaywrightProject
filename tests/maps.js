fruits = new Map()

fruits.set("apples", 200);
fruits.set("oranges", 100);
fruits.set("grapes", 300);

console.log(fruits);        // { 'apples' => 200, 'oranges' => 100, 'grapes' => 300 }
console.log(fruits.get("apples"))           //100
console.log(fruits.size);       //size of the map
fruits.delete("grapes");
console.log(fruits); 
console.log(fruits.has("apples"))       //returns true

// List all entries
let fruitList = "";
for (const x of fruits.entries()) {
  fruitList = fruitList + x + " ";
}

console.log(fruitList); 

fruits.clear();     //The clear() method removes all the elements from a map:

// Map initialization
const cars = new Map([["Honda", 100],
                ["Ford", 200],
                ["benz", 300]
]);
console.log(cars);

let text = "";
cars.forEach (function(value, key) {
  text += key + ' = ' + value + " "
})
console.log(text)

//Usage of map for manipulating the array values
// syntax 
// arrayVariable.map(...)

//Example to increment the values of an array element
const numbers = [1,2,3]  //array
result = numbers.map(a => a + 1); // [2, 3, 4]          //map as a function 

console.log(result)