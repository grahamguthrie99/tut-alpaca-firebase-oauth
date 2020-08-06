import React, { useContext } from 'react';
import { FirebaseContext } from '../config/Firebase/FirebaseContext';
import { Button } from "react-bootstrap"


const SignoutButton = ({ displayMenu }) => {
    const firebase = useContext(FirebaseContext)

    return (
        <Button variant='primary' onClick={() => {
            firebase.auth.signOut()
            localStorage.clear()

        }}>
            Sign Out
        </Button>
    )
}

export default SignoutButton;