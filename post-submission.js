document.addEventListener('DOMContentLoaded', function() {
    // Example values - replace these with your actual logic to get the values
    const timeScore = calculateTimeScore();
    const efficiencyScore = calculateEfficiencyScore();
    const attemptsScore = calculateAttemptsScore();
  
    const totalScore = (timeScore * 0.4) + (efficiencyScore * 0.3) + (attemptsScore * 0.3);
    let starsEarned = 0;
  
    if (totalScore >= 80) {
      starsEarned = 3;
    } else if (totalScore >= 60) {
      starsEarned = 2;
    } else {
      starsEarned = 1;
    }
  
    document.getElementById('time-score').innerText = `${timeScore}%`;
    document.getElementById('efficiency-score').innerText = `${efficiencyScore}%`;
    document.getElementById('attempts-score').innerText = `${attemptsScore}%`;
    document.getElementById('total-score').innerText = `${totalScore.toFixed(2)}%`;
    document.getElementById('star-rating').innerText = `${starsEarned} Star${starsEarned !== 1 ? 's' : ''}`;
  
    const levelCompleted = 1; // Example - replace with actual level data
    const progressBar = document.getElementById('progress-bar');
    const progress = (levelCompleted / 10) * 100;
    progressBar.style.width = `${progress}%`;
  });
  
  function calculateTimeScore() {
    // Example calculation - replace with actual logic
    return 80;
  }
  
  function calculateEfficiencyScore() {
    // Example calculation - replace with actual logic
    return 70;
  }
  
  function calculateAttemptsScore() {
    // Example calculation - replace with actual logic
    return 90;
  }
  