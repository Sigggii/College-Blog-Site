const handleEditRescentPost = (postId) => {
  window.location.assign(`/create-post?postId=${postId}`)
}

const handleDeleteRescentPost = (postId) => {
  const handleDeletePostSuccess = (postId) => {
    //reload page to update page after post was deleted
    window.location.reload()
  }
  callDeletePost(postId, handleDeletePostSuccess)
}
