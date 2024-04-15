const dialogTypes = {
  delete: { color: 'bg-danger', buttonText: 'Delete' },
}

const openDialog = (dialogType, title, message, onConfirm) => {
  const dialog = document.getElementById('confirm-dialog')
  document.getElementById('confirm-dialog-confirm-btn').classList.add(dialogTypes[dialogType].color)
  document.getElementById('confirm-dialog-confirm-btn').innerText =
    dialogTypes[dialogType].buttonText

  document.getElementById('confirm-dialog-title').innerText = title
  document.getElementById('confirm-dialog-message').innerText = message
  //Show dialog and make background grey
  dialog.classList.remove('hidden')
  document.getElementById('confirm-dialog-overlay').classList.remove('hidden')

  //closing dialog if cancel button is clicked
  document.getElementById('confirm-dialog-cancel-btn').addEventListener('click', (e) => {
    dialog.classList.add('hidden')
    document.getElementById('confirm-dialog-overlay').classList.add('hidden')
    document
      .getElementById('confirm-dialog-confirm-btn')
      .classList.remove(dialogTypes[dialogType].color)

    //Remove EventListener again
    document
      .getElementById('confirm-dialog-cancel-btn')
      .removeEventListener('click', e.currentTarget.handler)
  })

  document.getElementById('confirm-dialog-confirm-btn').addEventListener('click', (e) => {
    onConfirm()
    //Close dialog again
    dialog.classList.add('hidden')
    document.getElementById('confirm-dialog-overlay').classList.add('hidden')
    //Remove EventListener again
    document
      .getElementById('confirm-dialog-confirm-btn')
      .removeEventListener('click', e.currentTarget.handler)
  })
}
