IP Address
44.213.169.191

ssh -i ~/byu/cs260/startup/production.pem ubuntu@44.213.169.191


index.html
    login page

workout.html
    page for uploading workouts

history.html
    page for seeing past activities

profile.html
    page for making goals, seeing stats

friend.html??
    somehow see friend's page

Image Formatting:
    <style>
        img {
            width: 100%;
        }
    </style>

    Displays picture across the full page

Progress bar:
    <label for="bike"></label>
    <progress id="bike" value="80" max="100"> 80% 
    </progress>


20% HTML pages for each component of your application 
    - login, uploading workouts, past workouts, friend's workouts, profile, founder page
10% Proper use of HTML tags including BODY, NAV, MAIN, HEADER, FOOTER
    - I sure hope so
10% Links between pages as necessary
    - links in header, and one in footer
10% Application textual content
    - yes
10% Placeholder for 3rd party service calls
    - Quote by someone by me in founder.html
10% Application images
    - Founder info, standard profile pic
10% Login placeholder, including user name display
    - Login page
10% Database data placeholder showing content stored in the database
    - Workouts
10% WebSocket data placeholder showing where realtime communication will go
    - Friend updates on the left of most pages


Midterm Study
- console.log('Hello' + ' ' + 'world')
- const words = ['hello', 'world'];
- words.forEach((word) => console.log(word));

- function join(a, b) {
- return a + ' ' + b;
- }
- console.log(join('Hello', 'world'));

- function sayHello() {
- console.log('hello');
- }

<head>
    <script src="index.js"></script>
</head>
    <body>
        <script>
            function sayGoodbye() {
              alert('Goodbye');
            }
        </script>
        <button onclick="sayHello()">Say Hello</button>
        <button onclick="sayGoodbye()">Say Goodbye</button>
        <button onclick="let i=1;i++;console.log(i)">press me</button>
    </body>

** Await Async CodePen **
async function pickupPizza() {
  const order = createOrder();

  // async/await
  try {
    await placeOrder(order);
    await makePizza(order);
    serveOrder(order);
  } catch (order) {
    orderFailure(order);
  }
}

function createOrder() {
  // Make the order and associate it with a new HTML element
  const id = Math.floor(Math.random() * 10000);
  const orderElement = document.createElement("li");
  const order = { element: orderElement, id: id };

  // Insert the order into the HTML list
  orderElement.innerHTML = `<span>[${order.id}] 😋 <i>Waiting</i> ...</span>`;
  const orders = document.getElementById("orders");
  orders.appendChild(orderElement);

  return order;
}

async function placeOrder(order) {
  return new Promise((resolve, reject) => {
    doWork(order, 1000, 3000, resolve, reject, `cashier too busy`);
  });
}

async function makePizza(order) {
  return new Promise((resolve, reject) => {
    doWork(order, 2000, 5000, resolve, reject, `cook burnt pizza`);
  });
}

function doWork(order, min, max, resolve, reject, errMsg) {
  let workTime = Math.random() * (max - min) + min;
  setTimeout(() => {
    workTime = Math.round(workTime);
    if (workTime < max * 0.85) {
      resolve(order);
    } else {
      order.error = errMsg;
      reject(order);
    }
  }, workTime);
}

function serveOrder(order) {
  order.element.innerHTML = `<span>[${order.id}] 🍕 <b>Served</b>!</span>`;
}

function orderFailure(order) {
  order.element.innerHTML = `<span> [${order.id}] 😠 <b class='failure'>Failure</b>! ${order.error}</span>`;
}

Pizza Promise
function pickupPizza() {
  const order = createOrder();

  // Promise
  placeOrder(order)
    .then((order) => serveOrder(order))
    .catch((order) => {
      orderFailure(order);
    });
}

function createOrder() {
  // Make the order and associate it with a new HTML element
  const id = Math.floor(Math.random() * 10000);
  const orderElement = document.createElement("li");
  const order = { element: orderElement, id: id };

  // Insert the order into the HTML list
  orderElement.innerHTML = `<span>[${order.id}] 😋 <i>Waiting</i> ...</span>`;
  const orders = document.getElementById("orders");
  orders.appendChild(orderElement);

  return order;
}

function placeOrder(order) {
  return new Promise((resolve, reject) => {
    doWork(order, 1000, 3000, resolve, reject, `cashier too busy`);
  });
}

function doWork(order, min, max, resolve, reject, errMsg) {
  let workTime = Math.random() * (max - min) + min;
  setTimeout(() => {
    workTime = Math.round(workTime);
    if (workTime < max * 0.85) {
      resolve(order);
    } else {
      order.error = errMsg;
      reject(order);
    }
  }, workTime);
}

function serveOrder(order) {
  order.element.innerHTML = `<span>[${order.id}] 🍕 <b>Served</b>!</span>`;
}

function orderFailure(order) {
  order.element.innerHTML = `<span> [${order.id}] 😠 <b class='failure'>Failure</b>! ${order.error}</span>`;
}

Counting
console.count('a');
// OUTPUT: a: 1
console.count('a');
// OUTPUT: a: 2
console.count('b');
// OUTPUT: b: 1

Variables
let x = 1;

const y = 2; // can't change a const

Null	The type of a variable that has not been assigned a value.
Undefined	The type of a variable that has not been defined.
Boolean	true or false.
Number	A 64-bit signed number.
BigInt	A number of arbitrary magnitude.
String	A textual sequence of characters.
Symbol	A unique value.


Object	A collection of properties represented by name-value pairs. Values can be of any type.	{a:3, b:'fish'}
Function	An object that has the ability to be called.	function a() {}
Date	Calendar dates and times.	new Date('1995-12-17')
Array	An ordered sequence of any type.	[3, 'fish']
Map	A collection of key-value pairs that support efficient lookups.	new Map()
JSON	A lightweight data-interchange format used to share information across programs.	{"a":3, "b":"fish"}


Equality is ===

2 + '3';
// OUTPUT: '23'
2 * '3';
// OUTPUT: 6
[2] + [3];
// OUTPUT: '23'
true + null;
// OUTPUT: 1
true + undefined;
// OUTPUT: NaN

1 == '1';
// OUTPUT: true
null == undefined;
// OUTPUT: true
'' == false;
// OUTPUT: true

if else
a === 1 ? console.log(1) : console.log('not 1');

For arrays the object's name is the array index.

const arr = ['a', 'b'];
for (const name in arr) {
  console.log(name);
}
// OUTPUT: 0
// OUTPUT: 1

const arr = ['a', 'b'];
for (const val of arr) {
  console.log(val);
}
// OUTPUT: 'a'
// OUTPUT: 'b'

Strings
'quoted text'; // " also works

const l = 'literal';
console.log(`string ${l + (1 + 1)} text`);
// OUTPUT: string literal2 text

String functions
Function	Meaning
length	The number of characters in the string
indexOf()	The starting index of a given substring
split()	Split the string into an array on the given delimiter string
startsWith()	True if the string has a given prefix
endsWith()	True if the string has a given suffix
toLowerCase()	Converts all characters to lowercase

const s = 'Example:조선글';

console.log(s.length);
// OUTPUT: 11
console.log(s.indexOf('조선글'));
// OUTPUT: 8
console.log(s.split(':'));
// OUTPUT: ['Example', '조선글']
console.log(s.startsWith('Ex'));
// OUTPUT: true
console.log(s.endsWith('조선글'));
// OUTPUT: true
console.log(s.toLowerCase());
// OUTPUT: example:조선글


Functions
function hello(who) {
  return 'hello ' + who;
}

console.log(hello('world'));
// OUTPUT: hello world

function hello(who) {
  who.count++;
  console.log('hello ' + who.name);
}

hello({ name: 'world', count: 0 });
// OUTPUT: hello world

Label function
function labeler(value, title = 'title') {
  console.log(`${title}=${value}`);
}

labeler();
// OUTPUT: title=undefined

labeler('fish');
// OUTPUT: title=fish

labeler('fish', 'animal');
// OUTPUT: animal=fish

Anonymous functions
// Function that takes a function as a parameter
function doMath(operation, a, b) {
  return operation(a, b);
}

// Anonymous function assigned to a variable
const add = function (a, b) {
  return a + b;
};

console.log(doMath(add, 5, 3));
// OUTPUT: 8

// Anonymous function assigned to a parameter
console.log(
  doMath(
    function (a, b) {
      return a - b;
    },
    5,
    3
  )
);
// OUTPUT: 2

Inner Functions
function labeler(value) {
  function stringLabeler(value) {
    console.log('string=' + value);
  }
  function numberLabeler(value) {
    console.log('number=' + value);
  }

  if (typeof value == 'string') {
    stringLabeler(value);
  } else if (typeof value == 'number') {
    numberLabeler(value);
  }
}

labeler(5);
// OUTPUT: number=5

labeler('fish');
// OUTPUT: string=fish

Arrow Functions
const a = [1, 2, 3, 4];

// standard function syntax
a.sort(function (v1, v2) {
  return v1 - v2;
});

// arrow function syntax
a.sort((v1, v2) => v1 - v2);

() => 3;
// RETURNS: 3

() => {
  3;
};
// RETURNS: undefined

() => {
  return 3;
};
// RETURNS: 3


Closure
function makeClosure(a) {
  a = 'a2';
  const b = 'b2';
  return () => [a, b];
}
const a = 'a';
const b = 'b';

const closure = makeClosure(a);
console.log(closure());
// OUTPUT: ['a2', 'b2']

console.log(a, b);
// OUTPUT: 'a' 'b'

Debounce FUnction
window.addEventListener(
  'scroll',
  debounce(500, () => {
    console.log('Executed an expensive calculation');
  })
);

function debounce(windowMs, windowFunc) {
  let timeout;
  return function () {
    console.log('scroll event');
    clearTimeout(timeout);
    timeout = setTimeout(() => windowFunc(), windowMs);
  };
}

Arrow functions are a bit different because they inherit the this pointer of their creation context. So if we change our previous example to return an arrow function, then the this pointer at the time of creation will be globalThis.

globalThis.x = 'global';
const obj = {
  x: 'object',
  f: () => console.log(this.x),
};
obj.f();
// OUTPUT: global

DOM
Access DOM with document variable
function displayElement(el) {
  console.log(el.tagName);
  for (const child of el.children) {
    displayElement(child);
  }
}
displayElement(document);

const listElements = document.querySelectorAll('p');
for (const el of listElements) {
  console.log(el.textContent);
}

Modifying DOM
function insertChild(parentSelector, text) {
  const newChild = document.createElement('div');
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}
insertChild('#courses', 'new course');

function deleteElement(elementSelector) {
  const el = document.querySelector(elementSelector);
  el.parentElement.removeChild(el);
}
deleteElement('#courses div');

Event Listener
const submitDataEl = document.querySelector('#submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});

Clipboard	Cut, copied, pasted
Focus	An element gets focus
Keyboard	Keys are pressed
Mouse	Click events
Text selection	When text is selected

You can also add event listeners directly in the HTML. For example, here is a onclick handler that is attached to a button.
<button onclick='alert("clicked")'>click me</button>


Local Storage
Function	Meaning
setItem(name, value)	Sets a named item's value into local storage
getItem(name)	Gets a named item's value from local storage
removeItem(name)	Removes a named item from local storage
clear()	Clears all items in local storage

Async
One important restriction for working with await is that you cannot call await unless it is called at the top level of the JavaScript, or is in a function that is defined with the async keyword. Applying the async keyword transforms the function so that it returns a promise that will resolve to the value that was previously returned by the function. Basically this turns any function into an asynchronous function, so that it can in turn make asynchronous requests.
