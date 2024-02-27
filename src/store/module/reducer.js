// reducers.js
const initialState = {
    status: true
  };

   const statusReducer = (state = initialState, action) => {
    // console.log(state,action,"both");
    switch (action.type) {
      case 'TOGGLE_STATUS': 
        return { ...state, status: !state.status };
      case 'SET_STATUS':
        return { ...state, status: action.payload };
      default:
        return state;
    }
  };
  export default statusReducer;
  