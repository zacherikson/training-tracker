class History {
    constructor() {
        this.updateHeadline();
        this.loadWorkouts();
        this.updateFriendUpdatesList();
    }

    updateHeadline() {
        const headlineTitleEl = document.querySelector('.headlineTitle h1');
        if (headlineTitleEl) {
          const userName = this.getUserName();
          headlineTitleEl.textContent = `${userName}'s Training Tracker`;
        }
    }

    updateFriendUpdatesList() {
        const friendUpdatesEl = document.querySelector('.friendUpdates');
        if (friendUpdatesEl !== null) {
            friendUpdatesEl.innerHTML = ''; 
            const friendUpdates = JSON.parse(localStorage.getItem('friendUpdates') || '[]');
            
            for (let i = 0; i < friendUpdates.length && i < 25; i++) {
                const updateText = friendUpdates[i];
                const updateEl = document.createElement('li');
                updateEl.className = 'updateActivity';
                updateEl.textContent = updateText;
                friendUpdatesEl.appendChild(updateEl);
                i++;
            }
        }
    }

    getUserName() {
        return localStorage.getItem('userName') ?? 'User';
    }

    getActivities() {
        const activitiesString = localStorage.getItem('activities');
        if (activitiesString) {
            return JSON.parse(activitiesString);
        } else {
            return [];
        }
    }

    async loadWorkouts() {
        let workouts = [];
        try {
          // Get the latest high scores from the service
          const response = await fetch('/api/workouts');
          workouts = await response.json();
      
          // Save the scores in case we go offline in the future
          localStorage.setItem('activities', JSON.stringify(workouts));
        } catch {
          // If there was an error then just use the last saved scores
            const activitiesString = localStorage.getItem('activities');
            if (activitiesString) {
                return JSON.parse(activitiesString);
            } else {
                return [];
            }
        }
        this.showActivities(workouts);
    }

    showActivities(activities) {
        const historyEl = document.getElementById('activities'); 
        historyEl.innerHTML = ''; 
        if (activities.length === 0) {
            const activityEl = document.createElement('div');
            activityEl.className = 'activity';
            activityEl.innerHTML = `<div>No activities record yet.</div>`;
            return;
        }

        for (const activity in activities) {
            const activityEl = document.createElement('div');
            activityEl.className = 'activity';
            let activityData = activities[activity].activityData
            if (activityData.type === 'Run') {
                activityEl.innerHTML = `
                <div class="workout">
                    <div><b>${activityData.title}</b></div>
                    <table>
                        <tr>
                            <th>Type</th>
                            <th>Distance</th>
                            <th>Time</th>
                        </tr>
                        <tr>
                            <td>${activityData.type || 'N/A'}</td>
                            <td>${activityData.distance || 'N/A'}</td>
                            <td>${activityData.time || 'N/A'}</td>
                        </tr>
                    </table>
                    <p>${activityData.notes || ''}</p>
                </div>
                <hr>`;
            historyEl.insertBefore(activityEl, historyEl.firstChild);
            }
            if (activityData.type === 'Bike') {
                activityEl.innerHTML = `
                <div class="workout">
                    <div><b>${activityData.title}</b></div>
                    <table>
                        <tr>
                            <th>Type</th>
                            <th>Distance</th>
                            <th>Time</th>
                        </tr>
                        <tr>
                            <td>${activityData.type || 'N/A'}</td>
                            <td>${activityData.distance || 'N/A'}</td>
                            <td>${activityData.time || 'N/A'}</td>
                        </tr>
                    </table>
                    <p>${activityData.notes || ''}</p>
                </div>
                <hr>`;
            historyEl.insertBefore(activityEl, historyEl.firstChild);

            }
            if (activityData.type === 'Swim') {
                activityEl.innerHTML = `
                <div class="workout">
                    <div><b>${activityData.title}</b></div>
                    <table>
                        <tr>
                            <th>Type</th>
                            <th>Distance</th>
                            <th>Time</th>
                        </tr>
                        <tr>
                            <td>${activityData.type || 'N/A'}</td>
                            <td>${activityData.distance || 'N/A'}</td>
                            <td>${activityData.time || 'N/A'}</td>
                        </tr>
                    </table>
                    <p>${activityData.notes || ''}</p>
                </div>
                <hr>`;
            historyEl.insertBefore(activityEl, historyEl.firstChild);

            }
            if (activityData.type === 'Gym') {
                activityEl.innerHTML = `
                <div class="workout">
                    <div><b>${activityData.title}</b></div>
                    <table>
                        <tr>
                            <th>Type</th>
                            <th>Time</th>
                        </tr>
                        <tr>
                            <td>${activityData.type || 'N/A'}</td>
                            <td>${activityData.time || 'N/A'}</td>
                        </tr>
                    </table>
                    <p>${activityData.notes || ''}</p>
                </div>
                <hr>`;
            historyEl.insertBefore(activityEl, historyEl.firstChild);
            }
            if (activityData.type === 'Diet') {
                activityEl.innerHTML = `
                <div class="workout">
                    <div><b>${activityData.title}</b></div>
                    <table>
                        <tr>
                            <th>Type</th>
                            <th>Diet</th>
                        </tr>
                        <tr>
                            <td>${activityData.type || 'N/A'}</td>
                            <td>${activityData.dietRating || 'N/A'}</td>
                        </tr>
                    </table>
                    <p>${activityData.notes || ''}</p>
                </div>
                <hr>`;
            historyEl.insertBefore(activityEl, historyEl.firstChild);
            }
        }
    }
}

const history = new History();

