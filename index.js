'use strict';

// password show and hide function for register page

const eyeIcon = document.querySelector('#eye-icon');

eyeIcon.addEventListener('click', () => {
  const inputEl = document.querySelector('#reg-pass');

  if (inputEl.type == 'password') {
    inputEl.type = 'text';
    eyeIcon.src = 'eye-icons/eye-open.png';
  } else if (inputEl.type == 'text') {
    inputEl.type = 'password';
    eyeIcon.src = 'eye-icons/eye-close.png';
  }
});

// ----------------------------------

// Import Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
// Import Authentication
import {
  getAuth,
  createUserWithEmailAndPassword,
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



// Register user with Firebase Auth

const registerForm = document.querySelector('#register-form');
const registerEmail = document.querySelector('#reg-email');
const registerPass = document.querySelector('#reg-pass');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userName = document.querySelector('#user-name');
  localStorage.setItem('userName', userName.value);

  createUserWithEmailAndPassword(auth, registerEmail.value, registerPass.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user.uid;
      console.log(user);
      window.location = 'login.html';
      /// ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode ==>', errorCode);
      console.log('errorMessage ==>', errorMessage);
      // ..
    });
});

// Register user with Google auth

const googleBtn = document.querySelector('.goggle-btn');

googleBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user.displayName;
      localStorage.setItem('googleUserName', user)
      console.log(user);
      window.location = 'todo.html';
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode ==>', errorCode);
      console.log('errorMessage ==>', errorMessage);
      // The email of the user's account used.
      const email = error.customData.email;
      console.log(email);
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential);
      // ...
    });
});
