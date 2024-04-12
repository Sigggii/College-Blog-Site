const handleEditRescentPost = () => {
  const postId = document.getElementById('rescentPostId').value
  window.location.assign(`/create-post?postId=${postId}`)
}

const handleDeleteRescentPost = () => {
  const handleDeletePostSuccess = () => {
    //reload page to update page ater post was deleted
    window.location.reload()
  }
  const postId = document.getElementById('rescentPostId').value
  callDeletePost(postId, handleDeletePostSuccess)
}
