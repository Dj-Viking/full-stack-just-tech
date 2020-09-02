const commentFormHandler = async (event) => {
  try {
  event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    //checking we are getting the id of the post with this comment
    // after clicking the add comment button
    console.log(comment_text, post_id);
    if (comment_text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(
          {
            post_id: post_id,
            comment_text: comment_text
          }
        ),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.location.reload();
      } else {
        console.log("There was an error.");
        console.log(response.statusText);
      }
    }
  } catch(err) {
    console.log(err);
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);