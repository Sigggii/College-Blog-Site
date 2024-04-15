const handleEditRescentPost = (postId) => {
  window.location.assign(`/create-post?postId=${postId}`)
}

const handleDeleteRescentPost = (postId) => {
  const handleDeletePostSuccess = (postId) => {
    //reload page to update page after post was deleted, keep articles section open
    window.location.assign('/admin-console?section=articles')
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
