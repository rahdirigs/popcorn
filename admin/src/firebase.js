import firebase from 'firebase'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: 'AIzaSyDjo7PhXanLXJ4OgLE8qRzJqggv7vraVKY',
  authDomain: 'popcorn-dbms.firebaseapp.com',
  databaseURL: 'https://popcorn-dbms-default-rtdb.firebaseio.com',
  projectId: 'popcorn-dbms',
  storageBucket: 'popcorn-dbms.appspot.com',
  messagingSenderId: '623411637287',
  appId: '1:623411637287:web:598d72dbabbf682d24f202',
  measurementId: 'G-4PFNMHPNNP',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectStorage = firebase.storage()

export { projectStorage }
