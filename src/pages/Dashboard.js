import React from 'react';
import SignoutButton from "../components/SignoutButton"
import { Container, Jumbotron } from 'react-bootstrap'


const Dashboard = () => {
    return (
        <Container>
            <Jumbotron>
                <h1>Congrats! You have been authenticated</h1>
                <div>
                    <SignoutButton />
                </div>
            </Jumbotron>
        </Container>
    );
}

export default Dashboard;