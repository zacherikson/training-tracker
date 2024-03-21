const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetWorkouts
apiRouter.get('/workouts', (_req, res) => {
  res.send(workouts);
});

// SubmitWorkout
apiRouter.post('/workout', (req, res) => {
    workouts = updateWorkouts(req.body, workouts);
  res.send(workouts);
});

// SubmitGoal
let runGoal = '';
apiRouter.post('/runGoal', (req, res) => {
    runGoal = req.body.runGoal;
    res.send(runGoal);
});

let bikeGoal = '';
apiRouter.post('/bikeGoal', (req, res) => {
    bikeGoal = req.body.bikeGoal;
    res.send(bikeGoal);
});

let swimGoal = '';
apiRouter.post('/swimGoal', (req, res) => {
    swimGoal = req.body.swimGoal;
    res.send(swimGoal);
});

let gymGoal = '';
apiRouter.post('/gymGoal', (req, res) => {
    gymGoal = req.body.gymGoal;
    res.send(gymGoal);
});

let dietGoal = '';
apiRouter.post('/dietGoal', (req, res) => {
    dietGoal = req.body.dietGoal;
    res.send(dietGoal);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// The workouts are saved in memory and disappear whenever the service is restarted.
let workouts = [];
function updateWorkouts(newWorkout, workouts) {
    workouts.push(newWorkout);
    return workouts;
}

