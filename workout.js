class workout {
    // constructor() {
    //     const usesrNameEl = document.querySelector('.username');
    //     userNameEl.textContent = this.getUserName();
    
    // }

    updateHeadline() {
        const headlineTitleEl = document.querySelector('.headlineTitle');
        if (headlineTitleEl) {
          const userName = this.getUserName();
          headlineTitleEl.textContent = `${userName}'s Training Tracker`;
        }
    }

    getUserName() {
        return localStorage.getItem('userName');
    }

    
}

const workouts = workout();
updateHeadline();
