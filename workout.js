class Workout {
    constructor() {
        this.updateHeadline();
        this.hideUploadInfo();
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

    hideUploadInfo() {
        document.getElementById('activityInfo').style.display = 'none'
        document.getElementById('uploadContainer').style.display = 'none'
    }

    setupRunBikeSwimUpload() {
        document.getElementById('activityInfo').style.display = ''
        document.getElementById('distanceActivity').style.display = '';
        document.getElementById('timeActivity').style.display = '';
        document.getElementById('dietActivity').style.display = 'none';
        document.getElementById('uploadContainer').style.display = ''
    }

    setupGymUpload() {
        document.getElementById('activityInfo').style.display = ''
        document.getElementById('distanceActivity').style.display = 'none';
        document.getElementById('timeActivity').style.display = '';
        document.getElementById('dietActivity').style.display = 'none';
        document.getElementById('uploadContainer').style.display = ''
    }

    setupDietUpload() {
        document.getElementById('activityInfo').style.display = ''
        document.getElementById('distanceActivity').style.display = 'none';
        document.getElementById('timeActivity').style.display = 'none';
        document.getElementById('dietActivity').style.display = '';
        document.getElementById('uploadContainer').style.display = ''
    }

}

const workout = new Workout();

