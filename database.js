const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const workoutCollection = db.collection('workout');
const goalCollection = db.collection('goal');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addWorkout(workout) {
  workoutCollection.insertOne(workout);
}

function getWorkouts(email) {
  const query = { name: email};
  const cursor = workoutCollection.find(query);
  return cursor.toArray();
}

async function addGoal(goal) {
  const existingGoal = await goalCollection.findOne({ type: goal.type,email: goal.email });
  if (existingGoal) {
    const query = { type: goal.type, email: goal.email };
    const update = { $set: { goal: goal.goal } };
    await goalCollection.updateOne(query, update);
  } else {
    await goalCollection.insertOne(goal);
  }
}

function getRunGoal(email) {
  const query = { type:"run", email: email};
  const cursor = goalCollection.find(query);
  return cursor.toArray();
}
function getBikeGoal(email) {
  const query = { type:"bike", email: email};
  const cursor = goalCollection.find(query);
  return cursor.toArray();
}
function getSwimGoal(email) {
  const query = { type:"swim", email: email};
  const cursor = goalCollection.find(query);
  return cursor.toArray();
}
function getGymGoal(email) {
  const query = { type:"gym", email: email};
  const cursor = goalCollection.find(query);
  return cursor.toArray();
}
function getDietGoal(email) {
  const query = { type:"diet", email: email};
  const cursor = goalCollection.find(query);
  return cursor.toArray();
}


module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addWorkout,
  getWorkouts,
  addGoal,
  getRunGoal,
  getBikeGoal,
  getSwimGoal,
  getGymGoal,
  getDietGoal,
};
