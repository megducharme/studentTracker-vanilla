/////////////////////////////////////////////////////////////////////
/////////////////////////objects and methods/////////////////////////
/////////////////////////////////////////////////////////////////////


let person = {
    "firstName": "John",
    "lastName": "Wark",
    "age": 45,
    "fullName": function(monkey, butt){
        return monkey + " " + butt
    }
}

//a function that is a property of an object is called a METHOD. fullName is a METHOD on the object person

//to invoke (or "call") the function, we must use the object
let meg = person.fullName("Meg", "Ducharme")
//whenever you invoke a function that returns a value, ALWAYS (for now) store the value in a variable. If you do not do this, that value will be lost. 
console.log(meg)
//meg holds the return value of person.fullName

//the full name method will always take two parameters. If parameters are not passed to the method, monkey and butt will be undefined simply becuase you have not defined arguments for the method

//when defining a function/method, what you are accepting into the fuction is called a PARAMETER. When you invoke, or call a function, you are passing it an ARGUMENT



let person2 = {
    "firstName": "John",
    "lastName": "Wark",
    "age": 45,
    "fullName": function(monkey, butt){
        return monkey + " " + butt
    },
    "birthday": function(year){
        return year + 1
    }
}

let brithdayValue = person2.birthday(person2.age)
//always store a return value in a variable
person2.age = brithdayValue
//this is reassinging the value of person.age to the value we calculated on line 36

console.log(person2.age)



/////////////////////////////////////////////////////////////////////
/////////////////////////looping over arrays/////////////////////////
/////////////////////////////////////////////////////////////////////



const numbers = [0,1,1,2,3,5,8,13,21,34,55,89]
const colors = ["Periwinkle", "Amaranth", "Fuschia", "Tomato", "LightGreen"]
//loop over all of the colors and numbers

for(let index = 0; index < numbers.length; index++){
    let currentElement = numbers[index]
    //always do this becuase looking up the value at a specific position in an array in an "expensive operation" If we need to reference this value many, many times throughout the loop, we can simply refer to the variable instead of finding the value of the array at that index every single time

    console.log(currentElement)
    //each time the loop runs (until the condition index < numbers.length evaluates to false) console log the currentElement

}

//FOR LOOPS - HOW DO THEY WORK?
//let index = 0 - initializing the index at 0. When looping over an array (which we can use for loops for other things) we want to start wtih the first index of the array
//index < numbers.length - this is a condition that evaluates to true or false and will allow the loop to continue, or stop
//index ++ - each time the loop runs, increase the value of index by 1
//a for loop is ONLY doing a block of code a certain number of times. A for loop is not specifically made for an array.



/////////////////////////////////////////////////////////////////////
//////////////////////////////functions//////////////////////////////
/////////////////////////////////////////////////////////////////////



//a function is used when we want to use a block of code over, and over, and over again. So, if we wnat to iterate over an array over and over and over again, we can make one block of code that simply accepts an array as an argument

const iteratingArrays1 = function(theArray){
    for(let i = 0; i < theArray.length; i++){
        console.log(theArray[i])
    }
}
//we have now made a function that we can run every single time we want to iterate over an array. We just need to invoke it, and give it an array to iterate over. 
iteratingArrays1(numbers)
//invoking the array with the array "numbers"
iteratingArrays1(colors)
//invoking the array with the array "colors"



//////////////////////////////forEach & ES6////////////////////////////
//using the forEach method on an array
const iteratingArrays3 = function(theArray){
    theArray.forEach(
        function(currentItem){
            console.log(currentItem)
    })
}

//with ES6 syntax (fat arrow)
const iteratingArrays4 = (theArray) => {
    theArray.forEach(item => {
        console.log(currentItem)
    })
}









/////////////////////////////////////////////////////////////////////
///////////////////////DOM MANIPULATION//////////////////////////////
/////////////////////////////////////////////////////////////////////

const navElement = document.getElementById("navigation")
const outputElement = document.getElementById("output")
const fooElements = document.getElementsByClassName("foo")

const fooSection = document.querySelector("#output > section[class=foo]")
const fooSection2 = document.querySelector("#output > section.foo")
console.log(fooSection)

let instructor = "Joe"
// const jared = Array.from(document.querySelectorAll("#output .foo"))
// jared.forEach(el => el.innerHTML = `${instructor} is awesome`)


// const funny = document.querySelector("#output > section")
// funny.innerHTML = `${instructor} is awesome and funny`

for(let i = 0; i < fooElements.length; i++){
    let element= fooElements[i]
    element.innerHTML = `${instructor} is awesome`
    if(element === fooSection){
        element.innerHTML += " and funny"
    }
}