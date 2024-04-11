/**
 * Changes page to given PageNumber
 *
 * @param pageNumber PageNumber to set
 */
const setPageNumber = (pageNumber) => {
  document.getElementById('page-number').value = pageNumber
  //trigger submit-page-change button which executes callBackFunction "onPageChange()"
  document.getElementById('submit-page-change').click()
}
