const alertTypeColors = {
  danger: 'bg-danger',
  success: 'bg-success',
}

const closeAlert = () => {
  document.getElementById('alert').classList.add('hidden')
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
    closeAlert()
    document.getElementById('alert').classList.remove(alertTypeColors[type])
    //Remove EventListener again
    document.getElementById('close-alert').removeEventListener('click', event.currentTarget.handler)
  })
}
