// Function to handle new comment
const newComment = async (event) => {
    event.preventDefault();

    const commentBody = document.querySelector('#comment-body').value.trim();
  
    if (commentBody) {
      
      const response = await fetch('/api/comments/', {
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

  // Function to display signup error message 
  function commentError() {
    document.querySelector('#error').innerHTML= 
    '<div class="alert alert-danger text-center m-3 p-3" role="alert">Failed to comment :-( </div>';
    return('Failed to post comment');
  };

 //Event listener v2 - removes console error
$(document).on('submit', '.comment-form', function (event) {
  signUp(event)
});
