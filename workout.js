class Workout {
    constructor() {
        this.updateHeadline();
        this.addEventListeners();
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

    setupRunBikeSwimUpload() {
        document.getElementsById('distance').style.display = '';
        document.getElementById('time').style.display = '';
        document.getElementById('diet').style.display = 'none'; 
    }

    setupGymUpload() {
        document.getElementsById('distance').style.display = 'none';
        document.getElementById('time').style.display = '';
        document.getElementById('diet').style.display = 'none'; 
    }

    setupDietUpload() {
        document.getElementsById('distance').style.display = 'none';
        document.getElementById('time').style.display = 'none';
        document.getElementById('diet').style.display = ''; 
    }

    addEventListeners() {
        document.querySelector('button[name="run"]').addEventListener('click', () => this.setupRunBikeSwimUpload());
        document.querySelector('button[name="bike"]').addEventListener('click', () => this.setupRunBikeSwimUpload());
        document.querySelector('button[name="swim"]').addEventListener('click', () => this.setupRunBikeSwimUpload());
        document.querySelector('button[name="gym"]').addEventListener('click', () => this.setupGymUpload());
        document.querySelector('button[name="diet"]').addEventListener('click', () => this.setupDietUpload());
    }
}

const workout = new Workout();

