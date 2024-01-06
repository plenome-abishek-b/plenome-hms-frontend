import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
import storage from "services/Storage";
import accessToken from "helpers/jwt-token-access/accessToken";
import { toast } from "react-hot-toast";

const fireBaseBackend = getFirebaseBackend();

// function* loginUser({ payload: { user, history } }) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const response = yield call(
//         fireBaseBackend.loginUser,
//         user.email,
//         user.password
//       );
//       yield put(loginSuccess(response));
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
//       const response = yield call(postJwtLogin, {
//         email: user.email,
//         password: user.password,
//       });
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
//       const response = yield call(postFakeLogin, {
//         email: user.email,
//         password: user.password,
//       });
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     }
//     history.push("/dashboard");
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* loginUser({ payload: { user, history } }) {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      );
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      response = yield call(postJwtLogin, {
        email: user.email,
        password: user.password,
      });
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      });
    }

    localStorage.setItem("authUser", JSON.stringify(response));
    yield put(loginSuccess(response));

    // Check the condition before navigating to the dashboard
    if (response.status === 200) {
      history.push("/dashboard");
    } else if (response.status === 401) {
      prompt("Invalid email or password");
      // Handle the case where login is not successful due to invalid email or password
      // You can add additional actions or error messages if needed
    } else {
      console.error("Unexpected error occurred");
      // Handle other error cases here if needed
    }
  } catch (error) {
    yield put(apiError(error));
  }
}


function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    storage.removeSession();

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
      
    }
    history.push("/account/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(
        fireBaseBackend.socialLoginUser,
        data,
        type,
      );
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history.push("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
