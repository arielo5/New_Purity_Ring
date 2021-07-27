// player signup
async function playerSignupFormHandler(event) {
    event.preventDefault();
  
    const jerseyNumber = document.querySelector('#jerseyNumber-signup').value.trim();
    const favTeam = document.querySelector('#favTeam-signup').value.trim();
    const favPlayer = document.querySelector('#favPlayer-signup').value.trim();
    const coach = document.querySelector('#teams').value;
  

    if (jerseyNumber && favTeam && favPlayer) {
      const response = await fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify({
          jerseyNumber,
          favTeam,
          favPlayer,
          coach
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
        document.location.replace('/');
      }else{
        alert(response.statusText) 
    }
  }
};
document.querySelector('.player-signup-form').addEventListener('submit', playerSignupFormHandler);
