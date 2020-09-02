const editFormHandler = async (event) => {
  try {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    // const id = idSplitOnSlash.split('?')[
    //   idSplitOnSlash.split('?').length - 2
    // ];
    //console.log(title);
    //console.log(id);
    //console.log(id);
    const response = await fetch(`/dashboard/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify(
        {
          title: title
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.reload();
    } else {
      console.log('There was an error');
      console.log(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);