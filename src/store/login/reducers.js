const initialState = {
    user: null,
  };
  
  const loginReducer = (state = initialState, action) => {
    console.log('reducer',action)
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default loginReducer;
  