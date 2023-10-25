// Function to handle new comment
const newComment = async (event) => {
    event.preventDefault();

    // Collect value from the comment form
    const commentBody = document.querySelector('#comment-body').value.trim();
  
    if (commentBody) {
      
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ commentBody }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } else {
        commentError();
      }
    }
  };

  // Function to display comment error message 
  function commentError() {
    document.querySelector('#error').innerHTML= 
    '<div class="alert alert-danger text-center m-3 p-3" role="alert">Failed to post comment :-( </div>';
    return('Failed to post comment');
  };

 //Event listener v2 - removes console error
// $(document).on('submit', '.comment-form', function (event) {
//   newComment(event)
// });

document
  .querySelector('.comment-form')
  .addEventListener('submit', newComment);