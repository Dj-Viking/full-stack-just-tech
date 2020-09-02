const deleteFormHandler = async (event) => {
  try {
    event.preventDefault();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/dashboard/edit/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      console.log('there was an error');
      console.log(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
};

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);