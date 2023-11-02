import accessToken from "helpers/jwt-token-access/accessToken";

function storeTokens(accessToken,refreshToken){
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
}

function removeSession(){
    sessionStorage.clear();
}

const storage = {storeTokens, removeSession};

export default storage;

