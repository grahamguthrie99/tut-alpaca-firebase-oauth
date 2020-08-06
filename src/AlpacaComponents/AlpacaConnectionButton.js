import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap'
import { FirebaseContext } from '../config/Firebase/FirebaseContext';
const crypto = require('crypto')

const client_id = "8f01a49644a85a12d5f7da6ae39e6de2"
const redirect_uri = encodeURIComponent('http://localhost:3000/')

const AlpacaConnectionButton = () => {
    const firebase = useContext(FirebaseContext)
    const [error, setError] = useState({})

    async function connectToAlpaca() {
        const random_string = crypto.randomBytes(20).toString('hex')
        const codeURI =
            `https://app.alpaca.markets/oauth/authorize?` +
            `response_type=code&` +
            `client_id=${client_id}&` +
            `redirect_uri=${redirect_uri}&` +
            `state=${random_string}&` +
            `scope=data`
        try {
            const { code, state } = await openAlpacaPopUp(codeURI)
            if (!requestIsValid(random_string, state)) {
                throw new Error("Alpaca Authentication Invalid")
            }
            console.log(state)
            console.log(code)
            const dev = false
            const getAlpacaAuthorization = firebase.functions.httpsCallable('getAlpacaAuthorization');
            await getAlpacaAuthorization({ code, dev }).then(function (res) {
                console.log(res)
            })

        }
        catch (e) {
            const error = {}
            error.message = e.message
            setError(error)
        }

    }

    const requestIsValid = (inital_state, returned_state) => { return inital_state === returned_state }

    const openAlpacaPopUp = (uri) => {
        return new Promise((resolve, reject) => {
            const authWindow = window.open(uri);
            let snippet = uri | null;

            const interval = setInterval(async () => {
                try {
                    snippet = authWindow && authWindow.location && authWindow.location.search;
                } catch (e) { }
                if (snippet) {
                    const rawCode = snippet.substring(1);
                    const code = JSON.parse('{"' + rawCode.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
                    authWindow.close();
                    resolve(code);
                    clearInterval(interval)
                }
            }, 100);
        });
    };


    return (
        <div>
            <Button onClick={() => connectToAlpaca()}>
                Connect To Alpaca
            </Button>
            {error &&
                <p>
                    {error.message}
                </p>}
        </div>
    );
}

export default AlpacaConnectionButton;








