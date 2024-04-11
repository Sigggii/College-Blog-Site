const handleEditComment = (commentId) => {
  const commentContent = document.getElementById(`comment-content-${commentId}`)
  // Make comment editable
  commentContent.contentEditable = 'true'
  commentContent.classList.add('border-b', 'border-primary', 'border-solid')
  document.getElementById(`edit-comment-${commentId}`).classList.remove('hidden')
}

const handleUpdateComment = (commentId) => {
  const postId = document.getElementById('post-id').value
  const commentContent = document.getElementById(`comment-content-${commentId}`)
  const contentText = commentContent.innerText
  const onUpdateSuccess = () => {
    //reload page to see updated comment
    location.reload()
  }

  if (contentText && contentText !== '') {
    // Make comment uneditable
    commentContent.contentEditable = 'false'
    commentContent.classList.remove('border-b', 'border-primary', 'border-solid')
    document.getElementById(`edit-comment-${commentId}`).classList.add('hidden')

    callUpdateComment(postId, commentId, { content: contentText }, onUpdateSuccess)
  } else {
    //Raise error if content of comment is null / empty
    openAlert('Empty comment', 'You cant update a empty comment !!!')
  }
}

const handleDeleteComment = (commentId) => {
  const postId = document.getElementById('post-id').value
  const onDeleteSuccess = () => {
    //reload page to remove deleted comment
    location.reload()
  }

  callDeleteComment(postId, commentId, onDeleteSuccess)
}
