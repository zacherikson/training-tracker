class Goals {
    constructor() {
        this.updateWeeklyGoals();
        this.showUpdates();
    }

    showUpdates() {
        const friendUpdatesEl = document.querySelector('#friendUpdates');
        friendUpdatesEl.innerHTML = localStorage.getItem('friendUpdates');
    }

    async runGoalUpload() {
        let runGoalValue = document.getElementById('run-goal').value;
        let runGoalObject = { runGoal: runGoalValue };
        try {
            const response = await fetch('/api/runGoal', {
              method: 'POST',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify(runGoalObject),
          });
  
        const newRunGoal = await response.json();
        localStorage.setItem('runGoal', JSON.stringify(newRunGoal));
        } catch (error) {
            console.error('Error:', error);
            localStorage.setItem('runGoal', runGoalValue);
        }
        this.updateWeeklyGoals();
    }
    async bikeGoalUpload() {
        let bikeGoalValue = document.getElementById('bike-goal').value;
        let bikeGoalObject = { bikeGoal: bikeGoalValue };
        try {
            const response = await fetch('/api/bikeGoal', {
              method: 'POST',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify(bikeGoalObject),
          });
  
        const newBikeGoal = await response.json();
        localStorage.setItem('bikeGoal', JSON.stringify(newBikeGoal));
        } catch (error) {
            console.error('Error:', error);
            localStorage.setItem('bikeGoal', bikeGoalValue);
        }
        this.updateWeeklyGoals();
    }
    async swimGoalUpload() {
        let swimGoalValue = document.getElementById('swim-goal').value;
        let swimGoalObject = { swimGoal: swimGoalValue };
        try {
            const response = await fetch('/api/swimGoal', {
              method: 'POST',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify(swimGoalObject),
          });
  
        const newSwimGoal = await response.json();
        localStorage.setItem('swimGoal', JSON.stringify(newSwimGoal));
        } catch (error) {
            console.error('Error:', error);
            localStorage.setItem('swimGoal', swimGoalValue);
        }
        this.updateWeeklyGoals();
    }
    async gymGoalUpload() {
        let gymGoalValue = document.getElementById('gym-goal').value;
        let gymGoalObject = { gymGoal: gymGoalValue };
        try {
            const response = await fetch('/api/gymGoal', {
              method: 'POST',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify(gymGoalObject),
          });
  
        const newGymGoal = await response.json();
        localStorage.setItem('gymGoal', JSON.stringify(newGymGoal));
        } catch (error) {
            console.error('Error:', error);
            localStorage.setItem('gymGoal', gymGoalValue);
        }
        this.updateWeeklyGoals();
    }
    async dietGoalUpload() {
        let dietGoalValue = document.getElementById('diet-goal').value;
        let dietGoalObject = { dietGoal: dietGoalValue };
        try {
            const response = await fetch('/api/dietGoal', {
              method: 'POST',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify(dietGoalObject),
          });
  
        const newDietGoal = await response.json();
        localStorage.setItem('dietGoal', JSON.stringify(newDietGoal));
        } catch (error) {
            console.error('Error:', error);
            localStorage.setItem('dietGoal', dietGoalValue);
        }
        this.updateWeeklyGoals();
    }

    async updateWeeklyGoals() {
        let runTotal = 0;
        let bikeTotal = 0;
        let swimTotal = 0;
        let gymTotal = 0;
        let dietAverage = 0;
        let dietTotal = 0
        let i = 0;
        let activities = []
        try {
            const response = await fetch('/api/workouts');
            activities = await response.json();
        } catch {
            activities = JSON.parse(localStorage.getItem('activities')) || [];
        }
        for (const activity in activities) {
            let activityData = activities[activity];
            if (activityData.type === 'Run') {
                if (parseFloat(activityData.distance)){
                    runTotal += parseFloat(activityData.distance);
                }
            }
            if (activityData.type === 'Bike') {
                if (parseFloat(activityData.time)) {
                    bikeTotal += parseFloat(activityData.time);
                }
            }
            if (activityData.type === 'Swim') {
                if (parseFloat(activityData.time)) {
                    swimTotal += parseFloat(activityData.time);
                }
            }
            if (activityData.type === 'Gym') {
                if (parseFloat(activityData.time)) {
                    gymTotal += parseFloat(activityData.time);
                }
            }
            if (activityData.type === 'Diet') {
                if (parseFloat(activityData.dietRating)) {
                    dietTotal += parseFloat(activityData.dietRating);
                    i += 1;
                }                
            }
        }
        if (i > 0) {
            dietAverage = (dietTotal / i).toFixed(1);
        }

        let maxRun = localStorage.getItem('runGoal');
        if(maxRun) {
            document.getElementById('run').max = maxRun;
            document.getElementById('run').value = runTotal;
            document.getElementById('run').textContent = maxRun + '%';
            document.getElementById('runNumberProgress').textContent = runTotal + '/' + maxRun;
        }
        let maxBike = localStorage.getItem('bikeGoal');
        if(maxBike) {
            document.getElementById('bike').max = maxBike;
            document.getElementById('bike').value = bikeTotal;
            document.getElementById('bike').textContent = maxBike + '%';
            document.getElementById('bikeNumberProgress').textContent = bikeTotal + '/' + maxBike;
        }
        let maxSwim = localStorage.getItem('swimGoal');
        if(maxSwim) {
            document.getElementById('swim').max = maxSwim;
            document.getElementById('swim').value = swimTotal;
            document.getElementById('swim').textContent = maxSwim + '%';
            document.getElementById('swimNumberProgress').textContent = swimTotal + '/' + maxSwim;
        }
        let maxGym = localStorage.getItem('gymGoal');
        if(maxGym) {
            document.getElementById('gym').max = maxGym;
            document.getElementById('gym').value = gymTotal;
            document.getElementById('gym').textContent = maxGym + '%';
            document.getElementById('gymNumberProgress').textContent = gymTotal + '/' + maxGym;
        }
        let maxDiet = localStorage.getItem('dietGoal');
        if(maxDiet) {
            document.getElementById('dietProgress').max = maxDiet;
            document.getElementById('dietProgress').value = dietAverage;
            document.getElementById('dietProgress').textContent = maxDiet + '%';
            document.getElementById('dietNumberProgress').textContent = dietAverage + '/' + maxDiet;
        }
    }
}

const goal = new Goals();