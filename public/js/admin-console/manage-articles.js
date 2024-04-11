document.addEventListener('DOMContentLoaded', function (event) {
  const value = document.getElementById('article-select').value
  toggleManageArticleButtons(value)
  document.getElementById('article-select').addEventListener('change', (e) => {
    const value = document.getElementById('article-select').value
    toggleManageArticleButtons(value)
  })
})

const toggleManageArticleButtons = (value) => {
  if (value === '') {
    document.getElementById('manage-article-buttons').classList.add('hidden')
  } else {
    document.getElementById('manage-article-buttons').classList.remove('hidden')
  }
}

const handleEditPost = () => {
  const postId = document.getElementById('article-select').value
  //ToDo Handle Edit Post
}

const handleDeletePost = () => {
  const handleDeletePostSuccess = () => {
    //reload page to remove deleted article from select
    window.location.reload()
  }

  const postId = document.getElementById('article-select').value
  callDeletePost(postId, handleDeletePostSuccess)
}
