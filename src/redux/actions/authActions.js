import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes';
import axios from 'axios';

export function auth(email, password, isLogin) {
    return async (dispatch) => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAm8YSXovXkSjuWiuw8a42eweJcbd4nBOM'
        if (isLogin) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAm8YSXovXkSjuWiuw8a42eweJcbd4nBOM'
        }
        const res = await axios.post(url, authData)
        const data = res.data

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, time * 1000);
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(authLogout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(authLogout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}
