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
      console.log('Test')
      window.location.assign('/')
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
    }
  })
}
