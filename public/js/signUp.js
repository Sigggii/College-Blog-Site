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

  //Send SignUp Request to backend if passwords match, otherwise show error Message
  if (password === password_confirm) {
    signUp({ username: username, email: email, password: password })
  } else {
    openAlert('Error', 'Passwords dont match')
  }
}
