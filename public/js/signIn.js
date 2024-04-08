document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('signin-form').addEventListener('submit', (e) => {
    e.preventDefault()
    onSignIn()
  })
})

const onSignIn = () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  signIn({ email: email, password: password })
}
