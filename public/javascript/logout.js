 const logout = async () => {
  try {
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    console.log(id);
    const response = await fetch('/api/users/logout', {
      method: 'post',
      body: JSON.stringify(
        {
          post_id: id
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      console.log('There was an error');
      console.log(response.statusText);
    }
  } catch(e) {
    console.log(e);
  }
}

document.querySelector('#logout').addEventListener('click', logout);