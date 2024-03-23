const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('./database.js');

const app = express();

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.email, req.body.password);
  
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
  });

  // GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
  });

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
    const user = await DB.getUser(req.params.email);
    if (user) {
      const token = req?.cookies.token;
      res.send({ email: user.email, authenticated: token === user.token });
      return;
    }
    res.status(404).send({ msg: 'Unknown' });
  });

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetWorkouts
secureApiRouter.get('/workouts/:email', async (req, res) => {
    const email = req.params.email;
    const workouts = await DB.getWorkouts(email);
  res.send(workouts);
});

// GetRunGoal
secureApiRouter.get('/runGoals/:email', async (req, res) => {
    const email = req.params.email;
    const goal = await DB.getRunGoal(email);
    res.send(goal);
});

// GetBikeGoal
secureApiRouter.get('/bikeGoals/:email', async (req, res) => {
    const email = req.params.email;
    const goal = await DB.getBikeGoal(email);
    res.send(goal);
});

// GetSwimGoal
secureApiRouter.get('/swimGoals/:email', async (req, res) => {
    const email = req.params.email;
    const goal = await DB.getSwimGoal(email);
    res.send(goal);
});

// GetGymGoal
secureApiRouter.get('/gymGoals/:email', async (req, res) => {
    const email = req.params.email;
    const goal = await DB.getGymGoal(email);
    res.send(goal);
});

// GetDietGoal
secureApiRouter.get('/dietGoals/:email', async (req, res) => {
    const email = req.params.email;
    const goal = await DB.getDietGoal(email);
    res.send(goal);
});

// SubmitWorkout
secureApiRouter.post('/workout', async (req, res) => {
    const workout = { ...req.body, ip: req.ip };
    await DB.addWorkout(workout);
    const workouts = await DB.getWorkouts(workout.name);
  res.send(workouts);
});


secureApiRouter.post('/runGoal', async (req, res) => {
    const runGoal = { ...req.body, ip: req.ip };
    await DB.addGoal(runGoal);
    const goal = await DB.getRunGoal(runGoal.email);
    res.send(goal);
});

secureApiRouter.post('/bikeGoal', async (req, res) => {
    const bikeGoal = { ...req.body, ip: req.ip };
    await DB.addGoal(bikeGoal);
    const goal = await DB.getBikeGoal(bikeGoal.email);
    res.send(goal);
});

secureApiRouter.post('/swimGoal', async (req, res) => {
    const swimGoal = { ...req.body, ip: req.ip };
    await DB.addGoal(swimGoal);
    const goal = await DB.getSwimGoal(swimGoal.email);
    res.send(goal);
});

secureApiRouter.post('/gymGoal', async (req, res) => {
    const gymGoal = { ...req.body, ip: req.ip };
    await DB.addGoal(gymGoal);
    const goal = await DB.getGymGoal(gymGoal.email);
    res.send(goal);
});

secureApiRouter.post('/dietGoal', async (req, res) => {
    const dietGoal = { ...req.body, ip: req.ip };
    await DB.addGoal(dietGoal);
    const goal = await DB.getDietGoal(dietGoal);
    res.send(goal);
});

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

// The workouts are saved in memory and disappear whenever the service is restarted.
// let workouts = [];
// function updateWorkouts(newWorkout, workouts) {
//     workouts.push(newWorkout);
//     return workouts;
// }

