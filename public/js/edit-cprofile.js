async function editFormHandler(event) {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstName-edit').value.trim();
    const lastName = document.querySelector('#lastName-edit').value.trim();
    const teamName = document.querySelector('#teamName-edit').value.trim();

    if (firstName && lastName && teamName) {
      const response = await fetch('/api/coach-profile', {
        method: 'POST',
        body: JSON.stringify({
          teamName
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
        // document.location.replace('/');
      }else{
        alert(response.statusText) 
    }
  }
};
  
document.querySelector('.edit-form').addEventListener('submit', editFormHandler);