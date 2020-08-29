async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    try {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify(
          {
            username, 
            email, 
            password
          }
        ),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      //check res status
      if (response.ok) {
        console.log('success response');
        console.log(response);
      } else {
        console.log('There was an error');
        console.log(response.statusText);
      }
    } catch (e) {
      console.log(e);
    } 
  }
}

document.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);