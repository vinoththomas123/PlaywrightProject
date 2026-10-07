let array = ["a", "b", "c", "d"];

for (let i = 0; i < array.length; i++) {
    console.log("Normal For Loop")
    console.log(array[i]);
}

for (const item in array) {
    console.log("For In Loop")
    console.log(array[item]);
}


let json = {
    "EmpName": "Smith",
    "Age": 25,
    "Department": "Finance"
}

for (const item in json) {
    console.log("JSON - For in Loop");
    console.log(json[item]);
}

let jsonArray = [
    {
        "EmpName": "Smith",
        "Age": 25,
        "Department": "Finance"
    },
    {
        "EmpName": "Mathew",
        "Age": 35,
        "Department": "IT"
    }
]

console.log("For of Loop for jsonArray")

for (const element of jsonArray) {
    console.log(element.EmpName);
    console.log(element.Age);
    console.log(element.Department);
}


let complexJson = {
    data:
        [
            {
                "EmpName": "Smith",
                "Age": 25,
                "Department": "Finance"
            },
            {
                "EmpName": "Mathew",
                "Age": 35,
                "Department": "IT"
            }
        ]
}
console.log("For... of... Loop for complex json")

for (const element of complexJson.data) {
    console.log(element.EmpName);
    console.log(element.Age);
    console.log(element.Department);
}

//Anonymous arrow function -- > use "complexJson.data" as the object
console.log("Anonymous arrow function")
complexJson.data.forEach(element => {
    console.log(element.EmpName);
    console.log(element.Age);
    console.log(element.Department);
});

//anonymous normal function ---> use "complexJson.data" as the object
console.log("Anonymous normal function")
complexJson.data.forEach(function (value, key) {
    console.log(value.EmpName);
    console.log(value.Age);
    console.log(value.Department);
});


let Maps = new Map([["EmpName", "Reen"], ["Age", 27], ["Dept", "HR"]]);

empName = Maps.get("EmpName");
console.log("EmpName == > " + empName);

Maps.forEach((value, key) => {
    console.log(value);
    console.log(key);
})

for (let [key, value] of Maps.entries()) {
    console.log(value);
    console.log(key);
}

let Sets = new Set(["a", "b", "c", "d"])

Sets.forEach(value => {
    console.log(value)
})

for (const [key, value] of Sets.entries()){
    console.log(key);
    console.log(value);
}