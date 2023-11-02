
import { signUp } from "./authService";

export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';

export function signupAction(email, username, password){
    return (dispatch) => {
        signUp(email,username, password).then(res=>{
            console.log(res);
            dispatch();
        })
    };
}

export function confirmedSignupAction(payload) {
    return{
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    }
}