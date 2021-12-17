// import * as firebase from 'firebase/app';
// import {FIREBASE_CONFIG} from './config';

// import * as firebaseAuth from 'firebase/auth';
// import * as firebaseDb from 'firebase/database';
// import * as firebaseStorage from 'firebase/storage';

// export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);

import firebase from 'firebase';
import {FIREBASE_CONFIG} from './config';

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
export const firebaseStorage = firebaseApp.storage();

const FireBaseTools = {
  /**
   * Register a user with email and password
   *
   * @param user
   * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
   */
  registerUser: user =>
    firebaseAuth.createUserWithEmailAndPassword(user.email, user.password),

  /**
   * Log the user in using email and password
   *
   * @param user
   * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
   */
  loginUser: user => {
    return firebaseAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(userInfo => userInfo)
      .catch(error => {
        // errorCode: error.code,
        // errorMessage: error.message,
      });
  },
  // mohammad-aladin000@hotmail.com
  /**
   * Auth a user with CustomToken
   *
   * @param user
   * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
   */
  loginWithToken: () =>
    firebaseAuth
      .signInWithCustomToken(token)
      .then(userInfo => userInfo)
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/invalid-custom-token') {
          alert('The token you provided is not valid.');
        } else {
          console.error(error);
        }
      }),

  /**
   * Sign the user out
   *
   * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
   */
  logoutUser: () => firebaseAuth.signOut().then(() => null),

  /**
   * Retrieve the current user (Promise)
   * @returns {Promise}
   */
  fetchUser: () =>
    new Promise((resolve, reject) => {
      const unsub = firebaseAuth.onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },
        error => {
          reject(error);
        },
      );
    }),

  /**
   * Update a user's profile data
   *
   * @param u
   * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
   */
  updateUserProfile: u =>
    firebaseAuth.currentUser.updateProfile(u).then(
      () => firebaseAuth.currentUser,
      error => ({errorCode: error.code, errorMessage: error.message}),
    ),

  /**
   * Reset the password given the specified email
   *
   * @param email {string}
   * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
   */
  resetPasswordEmail: email =>
    firebaseAuth.sendPasswordResetEmail(email).then(
      () => ({message: 'Email sent'}),
      error => ({errorCode: error.code, errorMessage: error.message}),
    ),

  /**
   * Update the user's password with the given password
   *
   * @param newPassword {string}
   * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
   */
  changePassword: newPassword =>
    firebaseAuth.currentUser.updatePassword(newPassword).then(
      user => user,
      error => ({errorCode: error.code, errorMessage: error.message}),
    ),

  /**
   * Send an account email verification message for the currently logged in user
   *
   * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
   */
  sendEmailVerification: () =>
    firebaseAuth.currentUser.sendEmailVerification().then(
      () => ({message: 'Email sent'}),
      error => ({errorCode: error.code, errorMessage: error.message}),
    ),

  /**
   * Get the firebase database reference.
   *
   * @param path {!string|string}
   * @returns {!firebase.database.Reference|firebase.database.Reference}
   */
  getDatabaseReference: path => firebaseDb.ref(path),

  /**
   * Get the firebase sttorage reference.
   *
   * @param path {!string|string}
   * @returns {!firebase.storage.Reference|firebase.storage.Reference}
   */
  getStorageReference: path => firebaseStorage.ref(path),
};

export default FireBaseTools;
