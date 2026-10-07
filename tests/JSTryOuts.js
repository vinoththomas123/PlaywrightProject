
class MyClass {
    constructor() {
        this.value = 10;
    }
    // Traditional function - 'this' would be undefined or window in a callback
    traditionalMethod() {
        setTimeout(function () {
            console.log(this.value); // 'this' is not MyClass
        }, 1000);
    }
    // Arrow function - 'this' correctly refers to MyClass
    arrowMethod() {
        setTimeout(() => {
            console.log(this.value); // 'this' is MyClass
        }, 1000);
    }
}
const instance = new MyClass();
instance.traditionalMethod(); // Will likely log undefined or cause an error
instance.arrowMethod(); // Logs 10

// This will not work; as there is no return statement
let myFunction1 = (x, y) => { x * y };
let val1 = myFunction1(10, 20)
console.log(val1)
// This will by default return; no return statement needed
let myFunction2 = (x, y) => x * y;
let val2 = myFunction2(5, 10)
console.log(val2)
// return statement if curly braces is used
let myFunction3 = (x, y) => { return x * y };
let val3 = myFunction3(10, 10)
console.log(val3)

// Traditional Function
function functionName(a) {
    return a + 100;
}
console.log("Noraml Function: " + functionName(10))
// Arrow Function
const fname = (a) => a + 100;
console.log("Arrow Function: " + fname(10))

// JS Data types:
//JS Arrays
const fruits = ["Banana", "Orange", "Apple", "Mango"];
//using for in loop
for (const item in fruits) {
    console.log("Array Value: " + fruits[item])
}
//using for loop
for (let i = 0; i < fruits.length; i++) {
    console.log("Array using: For Loop " + fruits[i]);
}
//=====================================================================
// json data type:
let json = { "name": "Steve", "age": "25" }
console.log(json.name);
console.log(json.age);
//using for in loop - to read json
for (const item in json) {
    console.log("JSON Value: " + json[item])
}
//=====================================================================
// let map = new Map[["name", "MapElement"], ["age", 30]];
// map.array.forEach((value, key)=>{
//   console.log(key, value);
// });
