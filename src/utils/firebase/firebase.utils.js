import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup,  
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCsNZA0WapauDhJ9SGZzA1D2zk2xvLE67Y",
    authDomain: "crown-clothing-37f47.firebaseapp.com",
    projectId: "crown-clothing-37f47",
    storageBucket: "crown-clothing-37f47.appspot.com",
    messagingSenderId: "84443959897",
    appId: "1:84443959897:web:38cdbbae93fae8ede6d748"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const gooogleProvider = new GoogleAuthProvider ();

  gooogleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, gooogleProvider);
  

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation ={}
    ) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid );

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
      const {displayName, email } = userAuth;
      const createdAt = new Date(); 

      try{
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error catching the user', error.message);
      }

      return userDocRef;
    };
  }

   export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInUserWithEmailAndPassword = async (email, password) =>{
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  };