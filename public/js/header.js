//Opens the Drawer Element of the App-Bar
const handleOpenMenu = () => {
  document.getElementById('drawer').classList.remove('hidden');
};

//Closes the Drawer Element of the App-Bar
const handleCloseMenu = () => {
  document.getElementById('drawer').classList.add('hidden');
};
