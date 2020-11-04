import firebase from "firebase/app"
const firebaseConfig = {
    apiKey: "AIzaSyCxEzx3A3zFbXE-5-c4raAKCtxG1-UTytQ",
    authDomain: "mattu-birthday.firebaseapp.com",
    databaseURL: "https://mattu-birthday.firebaseio.com",
    projectId: "mattu-birthday",
    storageBucket: "mattu-birthday.appspot.com",
    messagingSenderId: "700825914558",
    appId: "1:700825914558:web:624d78442f58e59d6ee2ef",
    measurementId: "G-075EMMR2SD"
}

export default firebase.initializeApp(firebaseConfig)