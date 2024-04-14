//  error handler for api calls, displays a alert with the received error message
const handleError = async (error) => {
  const status = error.status
  const content = await error.json()
  openAlert(`${content.name} (${status})`, content.message)
}
