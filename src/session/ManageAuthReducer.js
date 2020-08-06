export const initialState =
{
    user: null,
    loading: false,
}

const LOGIN_START = "LOGIN_START";
const SET_USER_SUCCESS = "SET_USER_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

export function ManageAuthReducer(state, action) {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                loading: true,
                user: null,
            };
        case SET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                loading: false,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                loading: false,
            };
        default:
            return state;
    }
}

export function startLogin() {
    return {
        type: LOGIN_START
    };
}

export function setUser(user) {
    return {
        type: SET_USER_SUCCESS,
        payload: {
            user
        }
    };
}

export function loginFailure() {
    return {
        type: LOGIN_FAILURE,

    };
}
