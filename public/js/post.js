// Function to handle new comment
const newComment = async (event) => {
    event.preventDefault();

    // Collect value from the comment form
    const body = document.querySelector('#comment-body').value.trim();
    const post_id = document.querySelector('input[name="post-id"]').value;

    if (body && post_id) {
      
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ body, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace(`/posts/${post_id}`);
      } else {
        commentError();
      }
      
    }
  };

  // Function to display comment error message 
  function commentError() {
    console.error();
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        console.log("Failed to delete comment", err)
        res.status(500).json(err);
      }
    }
  };

document
  .querySelector('.comment-form')
  .addEventListener('submit', newComment);

  document
  .querySelector('.comment-list')
  .addEventListener('click', delButtonHandler);