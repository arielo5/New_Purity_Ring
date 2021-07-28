async function statsFormHandler(event) {
    event.preventDefault();
  
    const goals = document.querySelector('#goals').value.trim();
    const assists = document.querySelector('#assists').value.trim();
    const penaltyMinutes = document.querySelector('#penaltyMinutes').value.trim();
    const coachId = document.querySelector('#coach_id').innerHTML;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      console.log(id);

    if (goals && assists && penaltyMinutes) {
      const response = await fetch(`/api/stats/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          player_id: id,
          goals,
          assists,
          penaltyMinutes,
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
        document.location.replace(`/team/stats/${coachId}`);
      }else{
        alert(response.statusText) 
    }
  }
};
  
document.querySelector('.stats-form').addEventListener('submit', statsFormHandler);