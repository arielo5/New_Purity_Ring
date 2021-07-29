// player edit
async function playerEditFormHandler(event) {
    event.preventDefault();
  
    const jerseyNumber = document.querySelector('#jerseyNumber-edit').value.trim();
    const favTeam = document.querySelector('#favTeam-edit').value.trim();
    const favPlayer = document.querySelector('#favPlayer-edit').value.trim();
    // future development
    // const firstName = document.querySelector('#firstName-edit').value.trim();
    // const lastName = document.querySelector('#lastName-edit').value.trim();
    // const email = document.querySelector('#email-edit').value.trim();
    const id = document.querySelector('#user').innerHTML;
    
  

    if (jerseyNumber && favTeam && favPlayer) {
      const response = await fetch(`/api/profile/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          jerseyNumber,
          favTeam,
          favPlayer,
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        document.location.replace('/profile/');
      }else{
        alert(response.statusText) 
    }
  }
};
// delete player 
async function deletePlayerHandler(event) {
  event.preventDefault();

  const id = document.querySelector('#user').innerHTML;
  
  const response = await fetch(`/api/profile/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        user_id: id
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // check the response status
    if (response.ok) {
      document.location.replace('/');
    }else{
      alert('Failed to delete profile') 
    }
};
document.querySelector('.edit-form').addEventListener('submit', playerEditFormHandler);
document.querySelector('#deleteBtn').addEventListener('click', deletePlayerHandler);
