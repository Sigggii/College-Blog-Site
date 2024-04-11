document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('add-comment-form').addEventListener('submit', (e) => {
    e.preventDefault()
    handleAddComment()
  })
})

const handleAddComment = () => {
  const postId = document.getElementById('post-id').value
  const content = document.getElementById('new-comment-content').innerText

  const onAddCommentSuccess = () => {
    //reload page to see new comment
    location.reload()
    console.log('Test')
  }

  callAddComment({ content: content }, postId, onAddCommentSuccess)
}
