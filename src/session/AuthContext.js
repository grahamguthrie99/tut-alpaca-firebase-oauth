import React, { useEffect, createContext, useContext, useReducer } from "react";
import { FirebaseContext } from "../config/Firebase/FirebaseContext";

import { ManageAuthReducer, initialState } from "./ManageAuthReducer"
import { startLogin, setUser, loginFailure } from "./ManageAuthReducer"

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
    const firebase = useContext(FirebaseContext)
    const [authState, dispatch] = useReducer(ManageAuthReducer, initialState)

    const actions = {
        async login(token) {
            dispatch(startLogin())
            try {
                const user = await firebase.auth.signInWithCustomToken(token)
                dispatch(setUser(user.user))
            }
            catch (e) {
                dispatch(loginFailure())
                throw new Error(e.message);
            }
        }
    }

    useEffect(() => {
        const unlisten = firebase.auth.onAuthStateChanged(
            user => {
                if (user) {
                    dispatch(setUser(user))
                    localStorage.setItem('user', JSON.stringify(user));

                } else {
                    dispatch(setUser(null))
                    localStorage.removeItem('user');
                }
            },
        );
        return () => {
            unlisten();
        }
    }, [firebase]);

    return (
        <AuthContext.Provider
            value={{
                actions,
                authState

            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};