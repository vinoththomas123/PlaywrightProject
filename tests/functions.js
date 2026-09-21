//Arrow function
//a is a parameter 
const square = a => a * a;
//since it is one line no need of curly braces. 
//Automatically returns the value a * a
//When multiple lines are included then we need to have curly braces and explicit return statement

//here function is assigned to square so we need to call square to run the function
console.log(square(5));


//Anonymous normal function const x = function({ stmt })
const unit = {
    name: "vinoth",
    greet: function () {
        return this.name;   //this.name will be refering to unit since it is a normal function
    }


}
console.log(unit.greet())

//Anonymous normal function 2
const unit0 = {
    name: "vinoth",
    greet() {
        return this.name;       //this.name will be refering to unit0 since it is a normal function
    }
}
console.log(unit0.greet())

//Anonymous arrow function
const unit1 = {
    name: "vinoth",
    greet: () => {
        return this.name;
    }
}

console.log(unit1.greet())      //undefined as this.name will not be refering to unit1



//scope of 'this' moves outside and refers to instance variable name in arrow function
class TestRunner {
    constructor(name) {
        this.name = name;
    }

    run() {
        setTimeout(() => {                              //As it is an arrow function 
            console.log(`${this.name} test started`);   //this.name refers to the instance variable name 
        }, 1000);
    }
}

new TestRunner('Playwright').run();
// Playwright test started


//Constructor Function example
class Car {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }
    getDetails() {
        return `Car: ${this.brand} ${this.model}`;
    }
}
// Creating an instance
const car1 = new Car('Toyota', 'Corolla');
console.log(car1.getDetails()); // Output: Car: Toyota Corolla


async function myFunction() {
    return "Hello";
}
// Equivalent to:
function myFunction() {
    return Promise.resolve("Hello");
}

// named function
function fn1(){
    return "Named function";
}

console.log(fn1());

//we can make the same function anonymous 
//an anonymous function should be assigned to an identifier, here it is assigned to fn2 variable

const fn2 = function(){
    return "Anonymous function";
}

console.log(fn2());

// but an arrow function a => a * a can be written without identifier
a => a * a;

//How to make create a self executable
// Self Executable function 
//syntax ( ()=>{} ) ();

( ()=> console.log("Self Executable arrow function called") ) ();

//Example for passing an argument to a self executable function
console.log((a=>a+10)(10));

//Using function keyword - note here we dont have to assign to an identifier 
(function(){
    console.log("Self Executable function using function keyword")
})();

