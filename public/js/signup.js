async function signupFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const lastName = document.querySelector('#lastName-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && lastName && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name,
          lastName,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
}
  
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);