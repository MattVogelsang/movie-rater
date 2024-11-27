const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#content').value.trim();
    const rating = document.querySelector('#rating').value.trim();
    const original_title= event.target.getAttribute("data-id")
    const movie_id= event.target.getAttribute("data-movieid")
  
    if (content && rating && original_title&& movie_id) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, rating, original_title, movie_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile'); 
      } else {
        alert('Failed to add comment. Please try again.');
      }
    }
  };

  document
  .querySelector('.post-comment')
  .addEventListener('submit', commentFormHandler);