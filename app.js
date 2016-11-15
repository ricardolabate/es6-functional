//Functional Programming
//High Order Functions

//Filter

var animals = [
  {name: 'Fluffykins', species: 'rabbit'},
  {name: 'Caro', species: 'dog'},
  {name: 'Hamilton', species: 'dog'},
  {name: 'Harold', species: 'fish'},
  {name: 'Ursula', species: 'cat'},
  {name: 'Jimmy', species: 'fish'}
];

var dogs = animals.filter(
  //callback function
  function(animal){
    return animal.species === 'dog';
})

console.log(dogs);

//Map
var animals = [
  {name: 'Fluffykins', species: 'rabbit'},
  {name: 'Caro', species: 'dog'},
  {name: 'Hamilton', species: 'dog'},
  {name: 'Harold', species: 'fish'},
  {name: 'Ursula', species: 'cat'},
  {name: 'Jimmy', species: 'fish'}
];

//traditional

var names = [];
for(var i = 0; i < animals.length; i++){
  names.push(animals[i].name);
}


var names = animals.map(function(animal){
  return animal.name;
});
var names = animals.map(function(animal){
  return animal.name + ' is a ' + animal.species;
})

//Arrow Functions
var names = animals.map((animal) => { return animal.name });
var names = animals.map((animal) => animal.name);
console.log(names);

//Reduce

var orders = [
  { amount: 250 },
  { amount: 400 },
  { amount: 100 },
  { amount: 325 }
];

var totalAmount = orders.reduce(function(sum, order){
  console.log("hello", sum, order)
  return sum + order.amount;
}, 0);

//ES6

var totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);

//Traditional

var totalAmount = 0;
for(var i = 0; i < orders.length; i++){
  totalAmount += orders[i].amount;
}

console.log(totalAmount);

//Closures

//Recursion - Part 7 of Functional Programming
//Recursion is when a function calls itself until it doesn't

//let is the new var
//creating a for loop in ES6
let countDownFrom = (num) => {
  //stop condition of the loop
  if(num === 0) return;
  console.log(num)
  countDownFrom(num - 1)
}

countDownFrom(10);

//Relation data base


{
  animals: {
    mammals:{
      dogs:{
        chihuahua: null
        labrador: null
      },
      cats:{
        persian: null
        siamese: null
      }
    }
  }
}

let categories = [
  { id: 'animals', 'parent': null },
  { id: 'mammals', 'parent': null },
  { id: 'cats', 'parent': 'mammals' },
  { id: 'dogs', 'parent': 'mammals' },
  { id: 'chihuahua', 'parent': 'dogs' },
  { id: 'labrador', 'parent': 'dogs' },
  { id: 'persian', 'parent': 'cats' },
  { id: 'siamese', 'parent': 'cats' }
]

let makeTree = (categories, parent) => {
  let node = {}
  //array of categories
  categories
    .filter(c => c.parent === parent)
    //forEach is recursive
    //we could use nested for loops (c inside b inside a, ex.)
    .forEach(c => node[c.id] =
             makeTree(categories, c.id))
  return node
}

console.log(
  JSON.stringify(
    makeTree(categories, null)
    , null, 2)
)

//Promises - similar to callbacks, a way of dealing with things being asynchronous
//when we don't know for certain in what order things will happen. Promises in a way
//are more powerful than callbacks because they COMPOSE - you can combine promises and
//chain them

//illustrating that this is an object
// let whenCatLoaded =
//     loadImagePromised('images/cat3.jpg')

//manipulating the Dom changing the src of an img tag
//whenCatLoaded is a PROMISE of a value
//Promises are like a bank that lends you cash
//even tough you don't actually have the money
//so we use Promise because we don't have the VALUE yet

whenCatLoaded.then((img) => {
  let imgElement =
      document.createElement("img")
  imgElement.src = img.src
  document.body.appendChild(imgElement)
})

//app.js

// import loadImage
// from './load-image-callbacked'

let addImg = (src) => {
  let imgElement =
      document.createElement("img")
  imgElement.src = src
  document.body.appendChild(imgElement)
}

loadImage('images/cat4.jpg',
  //2 arguments, one is the error and the other is success
  (error, img) => {
    let imgElement =
        document.createElement("img")
    imgElement.src = img.src
    document.body.appendChild(imgElement)
  })

Promise.all([
  loadImage('images/cat1.jpg'),
  loadImage('images/cat2.jpg'),
  loadImage('images/cat3.jpg'),
]).then((images) => {
  images.forEach(img => addImg.src))
}).catch((error){
   //handle error later
})

//load-image.js

function loadImage(url){
  //resolve and reject are the callback
  return new Promise((resolve, reject) => {
    let image = new Image()

    //onload is a listener
    image.onload = function(){
      callback(null, image)
    }

    //onerror is another listener
    image.onerror = function(){
      let message = 'Could not load image at' + url
      //callback(new Error(msg))
      reject(new Error(msg))
    }

    image.src = url

  })

}

// export default loadImage

//Functors - A functor is a function, that, given a value and another function, unwraps the values to get to its inner, calls
//the given function with the inner value(s), wraps the returned values in a new structure, and returns that new structure
//Array.map and Array.filter are functors

function plus1(value){
  if(Array.isArray(value){
     var newArray = []
     for(var i=0; i < value.length; i++){
       newArray[i] = value[i] + 1
     }
     return newArray
   }
   return value + 1
  }

console.log(plus1([3,4]));

function plus1(value){
  if(Array.isArray(value)){
     var newArray = []
     for(var i=0; i < value.length; i++){
       newArray[i] = value[i] + 1;
     }
     return newArray;
   }
  //checks to see if it's a string and continues the sequence just as the ex. above
  //but with a string instead
  if(typeof value === 'string'){
    var chars = value.split('')
    var newCharArray = []
    for(var i=0; i < chars.length; i++){
      newCharArray[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
    }
    return newCharArray.join('');
  }
   return value + 1
  }

// console.log(plus1('A,B,C'));

function stringFunctor(value, fn){
  var chars = value.split("");
  return chars.map(function(char){
    return String.fromCharCode(fn(char.charCode(0)))
  }).join("")
}

function plus1(value){
  return value + 1
}

function minus1(value){
  return value - 1
}

[3,4].map(plus1);  


