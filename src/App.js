import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap'
import AlpacaConnectionButton from './AlpacaComponents/AlpacaConnectionButton';


function App() {
  return (
    <Container>
      <Jumbotron>
        <h1>Alpaca OAuth</h1>
        <p>
          This is a simple tutorial on how to connect Alpaca to Google Firebase.
        </p>
        <div>
          <AlpacaConnectionButton />
        </div>
      </Jumbotron>
    </Container>
  );
}

export default App;
