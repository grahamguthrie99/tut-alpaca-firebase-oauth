import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap'
import AlpacaConnectionButton from '../AlpacaComponents/AlpacaConnectionButton';


const Landing = (props) => {
    return (
        <Container>
            <Jumbotron>
                <h1>Alpaca OAuth</h1>
                <p>
                    This is a simple tutorial on how to connect Alpaca to Google Firebase. The following can be used similarily to connect any 3rd party OAuth2 provider to firebase
                </p>
                <div>
                    <AlpacaConnectionButton props={props} />
                </div>
            </Jumbotron>
        </Container>
    );
}

export default Landing;