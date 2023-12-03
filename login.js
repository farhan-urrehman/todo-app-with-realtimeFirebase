'use strict';

// password show and hide function for login page

const eyeIconLg = document.querySelector('#eye-icon-lg');

eyeIconLg.addEventListener('click', () => {
  const inputEl = document.querySelector('#login-pass');
  if (inputEl.type == 'password') {
    inputEl.type = 'text';
    eyeIconLg.src = 'eye-icons/eye-open.png';
  } else if (inputEl.type == 'text') {
    inputEl.type = 'password';
    eyeIconLg.src = 'eye-icons/eye-close.png';
  }
});

// ----------------------------------

// Import Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyATLrxtkBaDxaE13Fc-mGnJVr9Ox7n92tc',
  authDomain: 'todo-app-9cf74.firebaseapp.com',
  projectId: 'todo-app-9cf74',
  storageBucket: 'todo-app-9cf74.appspot.com',
  messagingSenderId: '412288055930',
  appId: '1:412288055930:web:050b880c9dec5e1c05d9c3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// login user with Firebase Auth

const loginForm = document.querySelector('#login-form');
const loginEmail = document.querySelector('#login-email');
const loginPass = document.querySelector('#login-pass');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const loginUserName = document.querySelector('#login-userName').value
  localStorage.setItem('loginUserName', loginUserName)


  signInWithEmailAndPassword(auth, loginEmail.value, loginPass.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      window.location = 'todo.html'
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode ==>', errorCode);
      console.log('errorMessage ==>', errorMessage);

      // Alert if user is not registered
      if (
        errorCode == 'auth/invalid-credential' ||
        errorMessage == 'Firebase: Error (auth/invalid-credential)'
      ) {
        console.log('Invalid Info or Not registered');
      }
    });
});


// Login with Google auth

const googleLoginBtn = document.querySelector('.goggle-btn')

googleLoginBtn.addEventListener('click', () => {
  
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user.displayName;
    localStorage.setItem('googleUserName', user)
    console.log(user);
    window.location = 'todo.html'
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('errorCode ==>', errorCode);
    console.log('errorMessage ==>', errorMessage);
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})