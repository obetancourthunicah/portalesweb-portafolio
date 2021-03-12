import firebase from 'firebase';

var config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
}

const fire = firebase.initializeApp(config);

export default fire;


/*
agregar este archivo en un archivo .env con los valores correspondientes

REACT_APP_APIKEY=
REACT_APP_AUTHDOMAIN=
REACT_APP_DATABASEURL=
REACT_APP_PROJECTID=
REACT_APP_STORAGEBUCKET=
REACT_APP_MESSAGINGSENDERID=
REACT_APP_APPID=
*/
