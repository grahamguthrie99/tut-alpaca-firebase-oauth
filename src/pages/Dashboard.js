import React, { useEffect, useContext, useState } from 'react';
import SignoutButton from "../components/SignoutButton"
import { Container, Jumbotron } from 'react-bootstrap'
import { FirebaseContext } from '../config/Firebase/FirebaseContext';
import { AuthContext } from '../session/AuthContext';


const Dashboard = () => {
    const { authState: { user } } = useContext(AuthContext);
    const { uid } = user || JSON.parse(localStorage.getItem("user"))
    const firebase = useContext(FirebaseContext)
    const [portfolioValue, setPortfolioValue] = useState(null)

    useEffect(() => {
        if (uid)
            firebase.db.ref(`/users/${uid}`)
                .on("value", function (snapshot) {
                    setPortfolioValue(snapshot.val().portfolio_value)

                })

    }, [firebase, uid])

    return (
        <Container>
            <Jumbotron>
                <h1>Congrats! You have been authenticated</h1>
                {portfolioValue && <p>Current Portfolio Value: ${portfolioValue}</p>}
                <div>
                    <SignoutButton />
                </div>
            </Jumbotron>
        </Container>
    );
}

export default Dashboard;