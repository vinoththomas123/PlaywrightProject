
const array = ["a", "b", "c", "d"]
console.log(array)


const set = new Set (array)
console.log(set)   //Set(4) { 'a', 'b', 'c', 'd' }

const num = [1, 2, 3, 4, 5]
const numbers = new Set (num)


numbers.add(6);

console.log(numbers)


// Itereations using for .. of

for (const x of numbers){
    console.log("x: "+ x)
}

// Itereations using forEach
set.forEach(function (x){
     console.log("x: "+ x)
})
 console.log("for in loop")

for (const index in set){
    console.log(set[index])
}
console.log("for in loop  - end - does not print the set items ")

// Iterate using Iterator
const iteratorArray = set.keys()

for (const x of iteratorArray){
    console.log(x)
}

set.delete("a");
console.log(set.has("a"));

set.clear();

console.log(set);

