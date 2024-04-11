const handleResetFilter = () => {
  //Reset Filter inputs
  document.getElementById('title-filter').value = ''
  document.getElementById('category-filter').value = ''
  document.getElementById('author-filter').value = ''

  //submit form page to reset filtered posts
  document.getElementById('post-filter-form').submit()
}
