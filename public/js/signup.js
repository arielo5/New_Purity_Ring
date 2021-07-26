async function signupFormHandler(event) {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstName-signup').value.trim();
    const lastName = document.querySelector('#lastName-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim(); 
    const is_coach = document.querySelector('.signup-form').answer.value === "coach";

    if (firstName && lastName && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          is_coach,
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
}
  
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);