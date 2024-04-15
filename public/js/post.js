// switch window to edit post of selected postId
const handleEditPost = (postId) => {
  window.location.assign(`/create-post?postId=${postId}`)
}

// delete post of selected postId
const handleDeletePost = (postId) => {
  const handleDeletePostSuccess = () => {
    //reload page to update page after post was deleted, keep articles section open
    window.location.assign('/')
  }

  const deleteArticle = () => {
    callDeletePost(postId, handleDeletePostSuccess)
  }

  openDialog(
    'delete',
    'Delete Article',
    'Are you sure you want to delete this Article?',
    deleteArticle,
  )
}
