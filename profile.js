class Profile {
    name;
    changeName() {
        this.name = document.getElementById('full-name').value;
        localStorage.setItem("name", this.name);
        const nameEl = document.querySelector('.userFullName p');
        if (nameEl) {
          nameEl.textContent = `${this.name}`;
        }
    }
}

const Profile = new Profile();