 import React from 'react'
 import firebase from 'firebase'
 
 var firebaseConfig = {
  apiKey: "AIzaSyA87BbLx7XIErCMpdRHE4oW2saC4Ubz9fc",
  authDomain: "webchat-91962.firebaseapp.com",
  projectId: "webchat-91962",
  storageBucket: "webchat-91962.appspot.com",
  messagingSenderId: "104426735235",
  appId: "1:104426735235:web:100e184e69b836e70ffdb6",
  measurementId: "G-PXGD0YKEWH"
};
 /*var firebaseConfig = {
  apiKey: "AIzaSyAY_l9mqOOc1-p4AntYj8jiPP5JXxcz9mI",
  authDomain: "webchat-9928c.firebaseapp.com",
  databaseURL: "https://webchat-9928c.firebaseio.com",
  projectId: "webchat-9928c",
  storageBucket: "webchat-9928c.appspot.com",
  messagingSenderId: "496104833852",
  appId: "1:496104833852:web:2a886a921c6b5efe6cd439"
};*/
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  export default firebase;
