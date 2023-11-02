import api from "services/Api"

export function signUp(email,username,password) {

    const postData = {
        email,
        username,
        password,
        returnSecureToken: true,
    }
  
    return api.postSignup(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=
    AIzaSyBuD1fdMtYa43fK1XNJODG3WvnTrRHCqqM`),
    postData
}
