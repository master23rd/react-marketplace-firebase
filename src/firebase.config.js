// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAiQF1VT5cuDF_De8dFRN-FJ6PcdnRS_M4',
  authDomain: 'house-marketplace-app-b307c.firebaseapp.com',
  projectId: 'house-marketplace-app-b307c',
  storageBucket: 'house-marketplace-app-b307c.appspot.com',
  messagingSenderId: '833074649876',
  appId: '1:833074649876:web:f292fe0b2e974dbf710001',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
