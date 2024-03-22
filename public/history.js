class History {
    constructor() {
        this.updateHeadline();
        this.showUpdates();
        this.loadWorkouts();
    }

    updateHeadline() {
        const headlineTitleEl = document.querySelector('.headlineTitle h1');
        if (headlineTitleEl) {
          const userName = this.getUserName();
          headlineTitleEl.textContent = `${userName}'s Training Tracker`;
        }
    }

    showUpdates() {
        const friendUpdatesEl = document.querySelector('#friendUpdates');
        friendUpdatesEl.innerHTML = localStorage.getItem('friendUpdates');
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
            // Get the workouts from the service
            const email = localStorage.getItem('userName');
            const response = await fetch('/api/workouts/' + email);
            workouts = await response.json();
            // Save the workouts in case we go offline in the future
            localStorage.setItem('activities', JSON.stringify(workouts));
        } catch {
          // If there was an error then just use the last saved scores
            workouts = this.getActivities();
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
            let activityData = activities[activity]
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
            else if (activityData.type === 'Bike') {
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
            else if (activityData.type === 'Swim') {
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
            else if (activityData.type === 'Gym') {
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
            else if (activityData.type === 'Diet') {
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

