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

// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(communityWorkouts);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
    communityWorkouts = updateScores(req.body, communityWorkouts);
  res.send(communityWorkouts);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let communityWorkouts = [];
function updateScores(newWorkout, communityWorkouts) {
  let found = false;
  for (const [i, prevScore] of communityWorkouts.entries()) {
    if (newWorkout.score > prevScore.communityWorkouts) {
        communityWorkouts.splice(i, 0, newWorkout);
      found = true;
      break;
    }
  }

  if (!found) {
    communityWorkouts.push(newWorkout);
  }

  if (communityWorkouts.length > 10) {
    communityWorkouts.length = 10;
  }

  return communityWorkouts;
}
