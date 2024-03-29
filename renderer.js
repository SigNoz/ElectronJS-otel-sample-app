document.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require('electron');
  
    document.getElementById('myButton').addEventListener('click', () => {
      ipcRenderer.send('button-click');
    });
  });
  