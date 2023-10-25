// Function to handle new comment
const newComment = async (event) => {
    event.preventDefault();

    // Collect value from the comment form
    const commentBody = document.querySelector('#comment-body').value.trim();
    const id = document.querySelector('input[name="post-id"]').value;

    if (commentBody && id) {
      
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ id, commentBody }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        commentError();
      }
      
    }
  };

  // Function to display comment error message 
  function commentError() {
    console.error();
  };

document
  .querySelector('.comment-form')
  .addEventListener('submit', newComment);