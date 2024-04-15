document.addEventListener('DOMContentLoaded', function (event) {
  const value = document.getElementById('user-select').value
  toggleManageUserButtons(value)

  // Add event listener to user select
  document.getElementById('user-select').addEventListener('change', (e) => {
    const value = document.getElementById('user-select').value
    toggleManageUserButtons(value)
  })

  // Add event listener to view user button
  document.getElementById('edit-userinfo-form').addEventListener('submit', (event) => {
    event.preventDefault()
    handeUpdateUserInfo()
  })

  // Add event listener to edit user button
  document.getElementById('edit-user-password-form').addEventListener('submit', (event) => {
    event.preventDefault()
    handleUpdateUserPassword()
  })
})

// Show or hide manage user buttons based on selected user
const toggleManageUserButtons = (value) => {
  if (value === '') {
    document.getElementById('manage-user-buttons').classList.add('hidden')
  } else {
    document.getElementById('manage-user-buttons').classList.remove('hidden')
  }
}

// open userinfomation container to edit user
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

// open password container to edit password
const handleEditPassword = () => {
  const userToEdit = JSON.parse(document.getElementById('user-select').value)
  document.getElementById('edit-password-userId').value = userToEdit._id
  //make inputs visible
  document.getElementById('update-user-password-container').classList.remove('hidden')
  document.getElementById('update-user-password-container').scrollIntoView()
}

// delete user which was selected
const handleDeleteUser = () => {
  const handleDeleteSuccess = () => {
    //reload page to update page after post was deleted, keep articles section open
    window.location.assign('/admin-console?section=users')
  }
  const deleteUser = () => {
    const user = JSON.parse(document.getElementById('user-select').value)
    callDeleteUser(user._id, handleDeleteSuccess)
  }

  openDialog(
    'delete',
    'Delete User',
    'Are you sure you want to delete this user? All Posts and Comments of this user will be deleted as well',
    deleteUser,
  )
}

const handleCancelEditUser = () => {
  document.getElementById('update-user-container').classList.add('hidden')
}

const handleCancelEditPassword = () => {
  document.getElementById('update-user-password-container').classList.add('hidden')
}

// update user with new data
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

// change password of user
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
