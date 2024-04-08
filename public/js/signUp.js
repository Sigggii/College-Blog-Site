document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault()
    onSignUp()
  })
})

const onSignUp = () => {
  //Get Signup Form Data
  const username = document.getElementById('username').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const password_confirm = document.getElementById('confirm-password').value

  //Show error Message if Passwords don't match
  if (password !== password_confirm) {
    document.getElementById('sign-up-error-message').textContent = "Passwords don't match"
    document.getElementById('sign-up-error-message').classList.remove('hidden')
  }

  signUp({ username: username, email: email, password: password })
}
