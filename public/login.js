function login() {
    const nameEl = document.querySelector("#username");
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "workout.html";
}

allUsers = {name: "Gerold", 
            name: 'Michael Jackson', 
            name: 'Stevie Wonder',
            name: 'Steve Jobs'    
        };
localStorage.setItem("allUsers", JSON.stringify(allUsers));