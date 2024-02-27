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
