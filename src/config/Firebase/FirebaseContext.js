import React, { createContext } from 'react';
import Firebase from "./firebase"
export const FirebaseContext = createContext(null);

export const FirebaseProvider = (props) => (
    <FirebaseContext.Provider value={new Firebase()}>
        {props.children}
    </FirebaseContext.Provider>
);
