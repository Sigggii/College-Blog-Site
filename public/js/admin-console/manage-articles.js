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

const handleViewDetailPage = () => {
  const postId = document.getElementById('article-select').value
  window.location.assign(`/posts/${postId}`)
}

const handleEditPost = () => {
  const postId = document.getElementById('article-select').value
  window.location.assign(`/create-post?postId=${postId}`)
}

const handleDeletePost = () => {
  const handleDeletePostSuccess = () => {
    //reload page to update page after post was deleted, keep articles section open
    window.location.assign('/admin-console?section=articles')
  }

  const postId = document.getElementById('article-select').value
  callDeletePost(postId, handleDeletePostSuccess)
}
