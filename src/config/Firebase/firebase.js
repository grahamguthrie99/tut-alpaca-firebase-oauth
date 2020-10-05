import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"
import 'firebase/storage'
import 'firebase/functions'


const config = {
    apiKey: ,
    authDomain: ,
    databaseURL: ,
    projectId: ,
    storageBucket: ,
    messagingSenderId: ,
    appId: ,
    measurementId: 

};


class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth()
        this.db = firebase.database();
        this.storage = firebase.storage();
        this.functions = firebase.functions();
    }
}

export default Firebase;