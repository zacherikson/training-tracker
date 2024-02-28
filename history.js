class History {
    constructor() {
        this.updateHeadline();
        this.showActivities();
    }

    updateHeadline() {
        const headlineTitleEl = document.querySelector('.headlineTitle h1');
        if (headlineTitleEl) {
          const userName = this.getUserName();
          headlineTitleEl.textContent = `${userName}'s Training Tracker`;
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

    showActivities() {
        const activities = this.getActivities();
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
                            <th>Diet</th>
                        </tr>
                        <tr>
                            <td>${activityData.type || 'N/A'}</td>
                            <td>${activityData.distance || 'N/A'}</td>
                            <td>${activityData.time || 'N/A'}</td>
                            <td>${activityData.dietRating || 'N/A'}</td>
                        </tr>
                    </table>
                    <p>${activityData.notes || ''}</p>
                </div>
                <hr>`;
            historyEl.appendChild(activityEl);
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
            historyEl.appendChild(activityEl);
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
            historyEl.appendChild(activityEl);
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
            historyEl.appendChild(activityEl);
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
            historyEl.appendChild(activityEl);
            }
        }
    }
}

const history = new History();

