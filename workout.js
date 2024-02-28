class Workout {
    constructor() {
        this.updateHeadline();
        this.hideUploadInfo();
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
        return localStorage.getItem('userName') ?? 'User';
    }

    hideUploadInfo() {
        document.getElementById('activityInfo').style.display = 'none'
        document.getElementById('uploadContainer').style.display = 'none'
        document.getElementById('successfulUpload').style.display = 'none'
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
        document.getElementById('diet').value = '';
        document.getElementById('note').value = '';
    }

    upload() {
        let title = document.getElementById('title').value;
        let notes = document.getElementById('note').value; 
        let activityData = {}

        if (this.workoutType === 'Run' || this.workoutType === 'Bike' ||
        this.workoutType === 'Swim') {
            let distance = document.getElementById('distance').value;
            let time = document.getElementById('time').value;
            activityData = {
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
                type: this.workoutType,
                title: title,
                time: time,
                notes: notes
            };
        }
        if (this.workoutType === 'Diet') {
            let diet = document.getElementById('diet').value;
            activityData = {
                type: this.workoutType,
                title: title,
                dietRating: diet,
                notes: notes
            };
        }

        let history = JSON.parse(localStorage.getItem('activities')) || [];
        history.push({activityData});
        localStorage.setItem('activities', JSON.stringify(history));

        this.showSuccessfulUpload();
        this.friendUpdate(activityData);
        this.clearInputs();
    }

    friendUpdate(activity) {
        const friendUpdatesEl = document.querySelector('.friendUpdates');
        const updateEl = document.createElement('div');
        updateEl.className = 'updateActivity';
        updateEl.innerHTML = `
        <div class="updateActivity">
            <li>${localStorage.getItem('userName')} just uploaded a ${activity.type}!</li>
        </div>`;
        friendUpdatesEl.append(updateEl);
    }
}

const workout = new Workout();

