class Goals {
    runGoalUpload() {
        let runGoal = document.getElementById('run-goal').value;
        localStorage.setItem('runGoal', runGoal);
        this.updateWeeklyGoals();
    }
    bikeGoalUpload() {
        let bikeGoal = document.getElementById('bike-goal').value;
        localStorage.setItem('bikeGoal', bikeGoal);
    }
    swimGoalUpload() {
        let swimGoal = document.getElementById('swim-goal').value;
        localStorage.setItem('swimGoal', swimGoal);
    }
    gymGoalUpload() {
        let gymGoal = document.getElementById('gym-goal').value;
        localStorage.setItem('gymGoal', gymGoal);
    }
    dietGoalUpload() {
        let dietGoal = document.getElementById('diet-goal').value;
        localStorage.setItem('dietGoal', dietGoal);
    }

    updateWeeklyGoals() {
        let max = localStorage.getItem('runGoal');
        if(max) {
            document.getElementById('run').max = max;
            document.getElementById('run').textContent = max + '%';
            document.getElementById('numberProgress').textContent = '0' + '/' + max;
        }
    }
}

const Goals = new Goals();