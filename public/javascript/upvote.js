const upvoteClickHandler = async (event) => {
  try {
    event.preventDefault();
    
    // //checking if the id in the url query parameter
    // //matches the console log of the id in browser console
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    console.log(id);

    const response = await fetch('/api/posts/upvote', {
      method: 'PUT',
      body: JSON.stringify(
        {
          post_id: id
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(response.ok){
      document.location.reload();

    } else {
      console.log('There was an error');
      console.log(response.statusText);
    }
  } catch(err) {
    console.log(err);
  }
}

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);