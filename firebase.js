import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    query, 
    where, 
    doc, 
    getDoc,
    addDoc,
    updateDoc
} from 'firebase/firestore/lite';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword ,
    GoogleAuthProvider,
    signInWithRedirect
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBNmfbrkAHBOexTGHx0fDk7wwoqNZYkQC0",
    authDomain: "maam-yoga.firebaseapp.com",
    projectId: "maam-yoga",
    storageBucket: "maam-yoga.appspot.com",
    messagingSenderId: "666556454989",
    appId: "1:666556454989:web:b906fbf0980c08bda6e404"
  };

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db =  getFirestore();

export function signIn (email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export function register (email, name, password) {

    try {
        return createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error)
    }
}

export function googleSSO () {
    const provider = new GoogleAuthProvider();

    signInWithRedirect(auth, provider)
    /*     .then((result) => {
            console.log(result.userEmail)
        }).catch(error => {
            console.log(error)
    }) */

}

export function getUserRoutines (userEmail) {
    const q = query(collection(db, 'routines'), where("userEmail", "==", userEmail));
    return getDocs(q)
        .then(routines =>routines.docs.map(doc => ({ id: doc.id, ...doc.data()})))
}

export function getRoutine (id) {
    return getDoc(doc(db, "routines", id))
        .then(doc => doc.data())
}

export function saveRoutine (routine, editId) {
    if (editId)
        return updateDoc(doc(db, "routines",editId), routine)
            .then(doc => editId)
    else 
        return addDoc(collection(db, "routines"), routine)
            .then(doc => doc.id)
}

export {collection}