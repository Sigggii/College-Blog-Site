let quill
document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('create-post-form').addEventListener('submit', (e) => {
    e.preventDefault()
    createPost()
  })
  // init the quill editor
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'link'],
    ['image', 'code-block', 'align', { list: 'ordered' }, { list: 'bullet' }],
  ]

  quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions,
      list: true,
    },
  })
})

const setImage = () => {
  // Get Image link out of input field and set it as src of main image component
  const imageLink = document.getElementById('post-image-link').value
  if (!imageLink || imageLink.length === 0) {
    document.getElementById('main-image').src = '/assets/main-image-placeholder.png'
  } else {
    document.getElementById('main-image').src = imageLink
  }
}

const createPost = () => {
  const title = document.getElementById('post-title').value
  const subtitle = document.getElementById('post-subtitle').value
  const category = document.getElementById('post-subtitle').value
  const timeToRead = document.getElementById('post-time-to-read').value
  const imageLink = document.getElementById('post-image-link').value
  const postContent = quill.root.innerHTML

  const postData = {
    title: title,
    subtitle: subtitle,
    category: category,
    timeToRead: timeToRead,
    imageLink: imageLink,
    content: postContent,
  }

  const onCreatePostSuccess = async (response) => {
    const content = await response.json()
    const postId = content.postId
    window.location.assign(`/posts/${postId}`)
  }

  callCreatePost(postData, onCreatePostSuccess)
}
