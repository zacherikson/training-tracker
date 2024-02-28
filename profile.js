class Goals {
    constructor() {
        this.updateWeeklyGoals();
    }

    runGoalUpload() {
        let runGoal = document.getElementById('run-goal').value;
        localStorage.setItem('runGoal', runGoal);
        this.updateWeeklyGoals();
    }
    bikeGoalUpload() {
        let bikeGoal = document.getElementById('bike-goal').value;
        localStorage.setItem('bikeGoal', bikeGoal);
        this.updateWeeklyGoals();
    }
    swimGoalUpload() {
        let swimGoal = document.getElementById('swim-goal').value;
        localStorage.setItem('swimGoal', swimGoal);
        this.updateWeeklyGoals();
    }
    gymGoalUpload() {
        let gymGoal = document.getElementById('gym-goal').value;
        localStorage.setItem('gymGoal', gymGoal);
        this.updateWeeklyGoals();
    }
    dietGoalUpload() {
        let dietGoal = document.getElementById('diet-goal').value;
        localStorage.setItem('dietGoal', dietGoal);
        this.updateWeeklyGoals();
    }

    updateWeeklyGoals() {
        let runTotal = 0;
        let bikeTotal = 0;
        let swimTotal = 0;
        let gymTotal = 0;
        let dietAverage = 0;
        let dietTotal = 0
        let i = 0;
        const activities = JSON.parse(localStorage.getItem('activities'));
        for (const activity in activities) {
            let activityData = activities[activity].activityData;
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
            console.log(dietAverage);
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
            document.getElementById('diet').max = maxDiet;
            document.getElementById('diet').value = dietAverage;
            document.getElementById('diet').textContent = maxDiet + '%';
            document.getElementById('dietNumberProgress').textContent = dietAverage + '/' + maxDiet;
        }
    }
}

const goal = new Goals();