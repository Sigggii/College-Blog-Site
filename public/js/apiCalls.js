const apiPath = '/api/v1'

const signIn = (body) => {
  fetch(`${apiPath}/users/signin`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
      window.location.assign('/')
    } else {
      handleError(response)
    }
  })
}

const signUp = (body) => {
  fetch(`${apiPath}/users/signup`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
      window.location.assign('/')
    } else {
      handleError(response)
    }
  })
}

const signOut = () => {
  fetch(`${apiPath}/users/signout`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((response) => {
    if (response.ok) {
      window.location.assign('/signin')
    } else {
      handleError(response)
    }
  })
}

const callCreatePost = (body, onSuccess) => {
  fetch(`${apiPath}/posts/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
      onSuccess(response)
    } else {
      handleError(response)
    }
  })
}

const callEditPost = (postId, editData, onSuccess) => {
  fetch(`${apiPath}/posts/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(editData),
  }).then((response) => {
    if (response.ok) {
      onSuccess()
    } else {
      handleError(response)
    }
  })
}

const callDeletePost = (postId, onSuccess) => {
  fetch(`${apiPath}/posts/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  }).then((response) => {
    if (response.ok) {
      onSuccess(response)
    } else {
      handleError(response)
    }
  })
}

const callAddComment = (body, postId, onSuccess) => {
  fetch(`${apiPath}/posts/${postId}/comment`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
      onSuccess()
    } else {
      handleError(response)
    }
  })
}

const callUpdateComment = (postId, commentId, content, onSuccess) => {
  fetch(`${apiPath}/posts/${postId}/comment/${commentId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(content),
  }).then((response) => {
    if (response.ok) {
      onSuccess()
    } else {
      handleError(response)
    }
  })
}

const callDeleteComment = (postId, commentId, onSuccess) => {
  fetch(`${apiPath}/posts/${postId}/comment/${commentId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  }).then((response) => {
    if (response.ok) {
      onSuccess()
    } else {
      handleError(response)
    }
  })
}
