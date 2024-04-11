const closeAlert = () => {
  document.getElementById('alert').classList.add('hidden')
}

const openAlert = (title, message) => {
  document.getElementById('alert-title').textContent = title
  document.getElementById('alert-message').textContent = message
  if (document.getElementById('alert').classList.contains('hidden')) {
    document.getElementById('alert').classList.remove('hidden')
  }
}
