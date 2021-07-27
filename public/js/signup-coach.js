async function coachSignupFormHandler(event) {
    event.preventDefault();
  
    const teamName = document.querySelector('#teamName-signup').value.trim();
  

    if (teamName) {
      const response = await fetch('/api/coach-profile', {
        method: 'POST',
        body: JSON.stringify({
          teamName,
          
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

  
document.querySelector('.coach-signup-form').addEventListener('submit', coachSignupFormHandler);