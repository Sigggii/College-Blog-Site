document.addEventListener('DOMContentLoaded', function (event) {
  const value = document.getElementById('user-select').value
  toggleManageUserButtons(value)
  document.getElementById('user-select').addEventListener('change', (e) => {
    const value = document.getElementById('user-select').value
    toggleManageUserButtons(value)
  })

  document.getElementById('edit-userinfo-form').addEventListener('submit', (event) => {
    event.preventDefault()
    handeUpdateUserInfo()
  })

  document.getElementById('edit-user-password-form').addEventListener('submit', (event) => {
    event.preventDefault()
    handleUpdateUserPassword()
  })
})

const toggleManageUserButtons = (value) => {
  if (value === '') {
    document.getElementById('manage-user-buttons').classList.add('hidden')
  } else {
    document.getElementById('manage-user-buttons').classList.remove('hidden')
  }
}

const handleEditUser = () => {
  //Feed inputs with user data
  const userToEdit = JSON.parse(document.getElementById('user-select').value)
  document.getElementById('userId').value = userToEdit._id
  document.getElementById('update-username-input').value = userToEdit.username
  document.getElementById('update-email-input').value = userToEdit.email
  // make role of user in select selected
  const roleSelect = document.getElementById('role-select')
  for (const option of roleSelect.options) {
    if (option.value === userToEdit.role) {
      option.selected = true
      break
    }
  }

  //make inputs visible
  document.getElementById('update-user-container').classList.remove('hidden')
  document.getElementById('update-user-container').scrollIntoView()
}

const handleEditPassword = () => {
  const userToEdit = JSON.parse(document.getElementById('user-select').value)
  document.getElementById('edit-password-userId').value = userToEdit._id
  //make inputs visible
  document.getElementById('update-user-password-container').classList.remove('hidden')
  document.getElementById('update-user-password-container').scrollIntoView()
}

const handleDeleteUser = () => {
  const handleDeleteSuccess = () => {
    //reload page to update page after post was deleted, keep articles section open
    window.location.assign('/admin-console?section=users')
  }
  const user = JSON.parse(document.getElementById('user-select').value)
  callDeleteUser(user._id, handleDeleteSuccess)
}

const handleCancelEditUser = () => {
  document.getElementById('update-user-container').classList.add('hidden')
}

const handleCancelEditPassword = () => {
  document.getElementById('update-user-password-container').classList.add('hidden')
}

const handeUpdateUserInfo = () => {
  const userId = document.getElementById('userId').value
  const editData = {
    username: document.getElementById('update-username-input').value,
    email: document.getElementById('update-email-input').value,
    role: document.getElementById('role-select').value,
  }

  const handeEditUserSuccess = () => {
    //Update Page after User was updated
    //reload page to update page after post was deleted, keep articles section open
    window.location.assign('/admin-console?section=users')
  }

  callEditUser(userId, editData, handeEditUserSuccess)
}

const handleUpdateUserPassword = () => {
  const userId = document.getElementById('edit-password-userId').value
  const password = document.getElementById('update-password-input').value

  const handleUpdatePasswordSuccess = () => {
    //close container again
    document.getElementById('update-user-password-container').classList.add('hidden')
    openAlert('Success', 'Password was updated!', 'success')
  }

  callChangePassword(userId, password, handleUpdatePasswordSuccess)
}
