 const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'post',
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