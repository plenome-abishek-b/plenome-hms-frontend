// actions.js
export const toggleStatus = () => ({
    type: 'TOGGLE_STATUS'
  });
  
  export const setStatus = (newStatus) => (
    console.log(newStatus,"new"),{
    type: 'SET_STATUS',
    payload: newStatus
  });
  