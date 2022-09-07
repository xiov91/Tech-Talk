// important to know which post you are editing
const postId = document.querySelector(`input[name='post-id']`).value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector(`input[name='post-title']`).value;
  const post_text = document.querySelector(`textarea[name='post-text']`).value;

  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard');
};

const deleteClickHandler = async function() {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });
// when the post is deleted, redirect to the dashboard
  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
