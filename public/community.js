async function loadCommunityWorkouts() {
    let communityWorkouts = [];
    try {
      // Get the latest workouts from the service
      const response = await fetch('/api/communityWorkouts');
      communityWorkouts = await response.json();
  
      // Save the scores in case we go offline in the future
      localStorage.setItem('communityWorkouts', JSON.stringify(communityWorkouts));
    } catch {
      // If there was an error then just use the last saved scores
      const communityWorkoutsText = localStorage.getItem('communityWorkouts');
      if (communityWorkoutsText) {
        communityWorkouts = JSON.parse(communityWorkoutsText);
      }
    }
  
    displayCommunityWorkout(communityWorkouts);
}

function displayCommunityWorkout(communityWorkouts) {
    const tableBodyEl = document.querySelector('#scores');
  
    if (communityWorkouts.length) {
      // Update the DOM with the scores
      for (const [i, communityWorkout] of communityWorkouts.entries()) {
        const positionTdEl = document.createElement('td');
        const nameTdEl = document.createElement('td');
        const scoreTdEl = document.createElement('td');
        const dateTdEl = document.createElement('td');
  
        positionTdEl.textContent = i + 1;
        nameTdEl.textContent = communityWorkout.name;
        scoreTdEl.textContent = communityWorkout.score;
        dateTdEl.textContent = communityWorkout.date;
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(positionTdEl);
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(scoreTdEl);
        rowEl.appendChild(dateTdEl);
  
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to score</td></tr>';
    }
  }
  
  loadCommunityWorkouts();