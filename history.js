class History {
    constructor() {
        this.updateHeadline();
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
        return localStorage.getItem('activities') ?? "No activities";
    }
}

const history = new History();

