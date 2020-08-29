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
            username: username,
            email: email,//leaving it as key here works, not sure why it works here but not for the other fetch ???
            password: password
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

async function loginFormHandler(event) {
  console.log(event.target);
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify(
          {
            email: email,//need key value pairs here for some reason
            password: password
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
    } catch (e) {
      console.log(e);
    }
  }
}

document.querySelector('.login-form')
.addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);