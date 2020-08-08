const axios = require('axios')
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const queryString = require('query-string');
const serviceAccount = require("./service-account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://alpacafirebaseoauth.firebaseio.com"
});

const alapcaBaseUrl = 'https://api.alpaca.markets'

exports.getAlpacaAuthorization = functions.https.onCall(async (data, context) => {

    const credentials = {
        client: {
            id: functions.config().alpaca.client_id,
            secret: functions.config().alpaca.client_secret
        },
        auth: {
            tokenHost: 'https://api.alpaca.markets/oauth/token',
        }
    }

    const code = data.code

    const redirect_uri = data.dev ? 'http://localhost:3000/' : 'https://alpacafirebaseoauth.web.app/'

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }

    const payload = {
        grant_type: 'authorization_code',
        code: code,
        client_id: credentials.client.id,
        client_secret: credentials.client.secret,
        redirect_uri: redirect_uri,
    }

    const res = await axios.post(credentials.auth.tokenHost, queryString.stringify(payload), config)
    const token = res.data.access_token;

    const accountInfo = await getAlpacaAccountInformation(token)
    const uid = `alpaca:${accountInfo.id}`

    accountInfo.token = token

    await updateTokenInFirebase(uid, token)
    await updateUserInFirebase(accountInfo, uid)
    await authenticateUserThroughFirebase(uid)

    const firebase_token = await admin.auth().createCustomToken(uid)

    return firebase_token


})

const getAlpacaAccountInformation = async (token) => {
    const endpoint = alapcaBaseUrl + '/v2/account'
    const config = {
        headers: {
            'Authorization': 'Bearer ' + `${token}`
        },
    }
    const { data } = await axios.get(endpoint, config)
    return data

}

const updateTokenInFirebase = async (uid, token) => {
    return await admin
        .database()
        .ref(`tokens/${uid}`)
        .set({ 'token': token })
}

const updateUserInFirebase = async (accountInfo, uid) => {
    return await admin
        .database()
        .ref(`users/${uid}`)
        .set(accountInfo)
}

const authenticateUserThroughFirebase = async (uid) => {
    try {
        return await admin.auth().getUser(uid);
    } catch (err) {
        try {
            return await admin.auth().createUser({
                uid: uid,
            });
        } catch (error) {
            throw err;
        }
    }
};