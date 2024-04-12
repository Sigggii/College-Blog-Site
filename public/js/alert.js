const alertTypeColors = {
  danger: 'bg-danger',
  success: 'bg-success',
}

const closeAlert = (type = 'danger', eventListener) => {
  document.getElementById('alert').classList.add('hidden')
  document.getElementById('alert').classList.remove(alertTypeColors[type])
  document.getElementById('alert').removeEventListener('click', this)
}

const openAlert = (title, message, type = 'danger') => {
  document.getElementById('alert-title').textContent = title
  document.getElementById('alert-message').textContent = message
  document.getElementById('alert').classList.add(alertTypeColors[type])
  if (document.getElementById('alert').classList.contains('hidden')) {
    document.getElementById('alert').classList.remove('hidden')
  }

  //Add EventListener for closing alert
  document.getElementById('close-alert').addEventListener('click', (event) => {
    closeAlert(type, this)
  })
}
