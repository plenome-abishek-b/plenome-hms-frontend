import {createSlice} from '@reduxjs/toolkit'

const Authslice = createSlice ({
    name:'auth',
    initialState: {
        USER: {
            userRoles: ''
        }
    },

    reducers: {
        setRoleName: (state, action) => {
            state.USER.userRoles = action.payload;
        },
        
    }
})

export const {setRoleName} = Authslice.actions;
// export default Authslice;