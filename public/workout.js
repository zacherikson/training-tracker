class Workout {
    constructor() {
        this.updateHeadline();
        this.hideUploadInfo();
        this.showUpdates();
    }
    workoutType;

    updateHeadline() {
        const headlineTitleEl = document.querySelector('.headlineTitle h1');
        if (headlineTitleEl) {
          const userName = this.getUserName();
          headlineTitleEl.textContent = `${userName}'s Training Tracker`;
        }
    }

    getUserName() {
        if (localStorage.getItem('userName') === ''){
            return localStorage.getItem('userName') ?? 'Champ';
        } else {
            return 'Champ';
        }
        
    }

    hideUploadInfo() {
        if (document.getElementById('activityInfo') !== null) {
            document.getElementById('activityInfo').style.display = 'none'
            document.getElementById('uploadContainer').style.display = 'none'
            document.getElementById('successfulUpload').style.display = 'none'
        }
    }

    runBikeSwimUploads() {
        document.getElementById('successfulUpload').style.display = 'none'
        document.getElementById('activityInfo').style.display = '';
        document.getElementById('distanceActivity').style.display = '';
        document.getElementById('timeActivity').style.display = '';
        document.getElementById('dietActivity').style.display = 'none';
        document.getElementById('uploadContainer').style.display = ''
    }

    setupRunUpload() {
        this.workoutType = 'Run';
        const titleEl = document.querySelector('.titleActivity b');
        titleEl.textContent = 'Run Title';
        this.runBikeSwimUploads();
    }

    setupBikeUpload() {
        this.workoutType = 'Bike';
        const titleEl = document.querySelector('.titleActivity b');
        titleEl.textContent = 'Bike Title';
        this.runBikeSwimUploads();
    }

    setupSwimUpload() {
        this.workoutType = 'Swim';
        const titleEl = document.querySelector('.titleActivity b');
        titleEl.textContent = 'Swim Title';
        this.runBikeSwimUploads();
    }

    setupGymUpload() {
        this.workoutType = 'Gym';
        const titleEl = document.querySelector('.titleActivity b');
        titleEl.textContent = 'Gym Title';
        document.getElementById('successfulUpload').style.display = 'none'
        document.getElementById('activityInfo').style.display = '';
        document.getElementById('distanceActivity').style.display = 'none';
        document.getElementById('timeActivity').style.display = '';
        document.getElementById('dietActivity').style.display = 'none';
        document.getElementById('uploadContainer').style.display = ''
    }

    setupDietUpload() {
        this.workoutType = 'Diet';
        const titleEl = document.querySelector('.titleActivity b');
        titleEl.textContent = 'Diet Title';
        document.getElementById('successfulUpload').style.display = 'none'
        document.getElementById('activityInfo').style.display = '';
        document.getElementById('distanceActivity').style.display = 'none';
        document.getElementById('timeActivity').style.display = 'none';
        document.getElementById('dietActivity').style.display = '';
        document.getElementById('uploadContainer').style.display = ''
    }

    showSuccessfulUpload() {
        document.getElementById('activityInfo').style.display = 'none';
        document.getElementById('distanceActivity').style.display = 'none';
        document.getElementById('timeActivity').style.display = 'none';
        document.getElementById('dietActivity').style.display = 'none';
        document.getElementById('uploadContainer').style.display = 'none'
        document.getElementById('successfulUpload').style.display = ''
    }

    clearInputs() {
        document.getElementById('title').value = '';
        document.getElementById('distance').value = '';
        document.getElementById('time').value = '';
        document.getElementById('dietInput').value = '';
        document.getElementById('note').value = '';
    }

    friendUpdate(activity) {
        const friendUpdates = document.querySelector('#friendUpdates');
        friendUpdates.innerHTML = `<li class="event">${localStorage.getItem('userName')} just uploaded a ${activity.type}!</li>` + friendUpdates.innerHTML;
        localStorage.setItem('friendUpdates',friendUpdates.innerHTML);
    }

    async saveUpload() {
        const userName = this.getUserName();
        const date = new Date().toLocaleDateString();
        let title = document.getElementById('title').value;
        let notes = document.getElementById('note').value; 
        let activityData = {}
        if (this.workoutType === 'Run' || this.workoutType === 'Bike' ||
        this.workoutType === 'Swim') {
            let distance = document.getElementById('distance').value;
            let time = document.getElementById('time').value;
            activityData = {
                name: userName,
                date: date,
                type: this.workoutType,
                title: title,
                distance: distance,
                time: time,
                notes: notes
            };
        }
        if (this.workoutType === 'Gym'){
            let time = document.getElementById('time').value;
            activityData = {
                name: userName,
                date: date,
                type: this.workoutType,
                title: title,
                time: time,
                notes: notes
            };
        }
        if (this.workoutType === 'Diet') {
            let diet = document.getElementById('dietInput').value;
            activityData = {
                name: userName,
                date: date,
                type: this.workoutType,
                title: title,
                dietRating: diet,
                notes: notes
            };
        }
            
        try {
          const response = await fetch('/api/workout', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(activityData),
        });

        const workouts = await response.json();
        
        this.showSuccessfulUpload();
        this.friendUpdate(activityData);
        this.clearInputs();

        // Store what the service gave us as the workouts
        localStorage.setItem('activities', JSON.stringify(workouts));
        } catch {
          // If there was an error then just track workouts locally
          this.upload(activityData);
        }
    }

    upload(activityData) {
        let history = JSON.parse(localStorage.getItem('activities')) || [];
        history.push({activityData});
        localStorage.setItem('activities', JSON.stringify(history));

        this.showSuccessfulUpload();
        this.friendUpdate(activityData);
        this.clearInputs();
    }

    showUpdates() {
        const friendUpdatesEl = document.querySelector('#friendUpdates');
        friendUpdatesEl.innerHTML = localStorage.getItem('friendUpdates');
    }
}

const workout = new Workout();

setInterval(() => {
    const friendUpdates = document.querySelector('#friendUpdates');
    friendUpdates.innerHTML = `<li class="event">Michael Jackson just uploaded a Run!</li>` + friendUpdates.innerHTML;

    localStorage.setItem('friendUpdates',friendUpdates.innerHTML);
},10000);