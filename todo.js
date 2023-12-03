// Importing Firebase Config

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  onValue,
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
import {
  getAuth,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyATLrxtkBaDxaE13Fc-mGnJVr9Ox7n92tc',
  authDomain: 'todo-app-9cf74.firebaseapp.com',
  projectId: 'todo-app-9cf74',
  storageBucket: 'todo-app-9cf74.appspot.com',
  messagingSenderId: '412288055930',
  appId: '1:412288055930:web:050b880c9dec5e1c05d9c3',
  databaseURL: 'https://todo-app-9cf74-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Database
const database = getDatabase(app);

//----------------------------------------------------------
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const userName = localStorage.getItem('userName');
const loginUserNAme = localStorage.getItem('loginUserName');
const googleUserName = localStorage.getItem('googleUserName');
const userKaNaam = document.querySelector('#userkanaam');

// display username if available
if (userName) {
  userKaNaam.innerHTML = `Welcome, ${userName}`;
} else if (loginUserNAme) {
  userKaNaam.innerHTML = `Welcome, ${loginUserNAme}`;
} else if (googleUserName) {
  userKaNaam.innerHTML = `Welcome, ${googleUserName}`;
} else {
  userKaNaam.innerHTML = 'Welcome, user';
}
// userKaNaam.innerHTML = `Welcome, ${userName}`;

// temp work
function addTask() {
  if (inputBox.value == ' ') {
    Swal.fire('You must create a task first');
    // alert("You must write something first");
  } else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);

    // set data to realtime database
    function writeUserData(userId, name, email, todos) {
      const db = getDatabase();
      set(ref(db, userName + userId), {
        username: name,
        email: email,
        tasks: todos,
      });
    }
    writeUserData(
      `${Math.trunc(Math.random() * 77777)}`,
      userName,
      userName,
      inputBox.value
    );
  }
  inputBox.value = ' ';
  saveData();
}
// temp work end

// Add data to todo list function
// function addTask() {
//   if (inputBox.value == '') {
//     Swal.fire('You must create a task first');
//     // alert("You must write something first");
//   } else {
//     let li = document.createElement('li');
//     li.innerHTML = inputBox.value;
//     listContainer.appendChild(li);
//     let span = document.createElement('span');
//     span.innerHTML = '\u00d7';
//     li.appendChild(span);
//   }
//   inputBox.value = ' ';
//   saveData();
// }

window.addTask = addTask;

// Checked function
listContainer.addEventListener(
  'click',
  function (e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
      saveData();
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// Save data to local storage function
function saveData() {
  localStorage.setItem('tasks', listContainer.innerHTML);
}

// Get data from local storage
function showSavedTask() {
  listContainer.innerHTML = localStorage.getItem('tasks');
}

showSavedTask();

// log out function

const logOutBtn = document.querySelector('#logout-btn');
logOutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log(auth);
      localStorage.clear();
      window.location = 'login.html';
    })
    .catch((error) => {
      // An error happened.
    });
});

// delete all tasks function

const deleteAllBtn = document.querySelector('#delete-all-btn');

deleteAllBtn.addEventListener('click', () => {
  listContainer.innerHTML = ' ';
  localStorage.removeItem('tasks');
});
