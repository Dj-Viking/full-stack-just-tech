const newFormHandler = async (event) => {
  try {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').val;
    const post_url = document.querySelector('input[name="post-url"]').val;
    
    
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(
        {
          title: title,
          post_url: post_url
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log("There was an error.");
      console.log(response.statusText);
    }
  } catch (err) {
    console.log(err);
  }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

/**
 * On the form submission, this will grab the post-title and 
 * post-url values from the form and send them with a POST 
 * request to /api/posts.
 * Remembering that the /api/posts endpoint requires a third
 * property: the user_id. like the other routes, this can be
 * obtained from the session object IF the user on the website
 * is logged in however. otherwise this property is not
 * in the session object if they are not logged in.
 */