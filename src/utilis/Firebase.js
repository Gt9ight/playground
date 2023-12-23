import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocs, setDoc, query, collection, writeBatch} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDCTZx54ti2AVAFQqnoiVAyCKV0yeptuek",
    authDomain: "todo-96cb3.firebaseapp.com",
    projectId: "todo-96cb3",
    storageBucket: "todo-96cb3.appspot.com",
    messagingSenderId: "1036607705684",
    appId: "1:1036607705684:web:0d1d3556b5210b1826d3c1"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore();



  export const createFleetDatabase = async (collectionKey, objectsToAdd) => {
    try {
      const TaskCollectionRef = collection(db, collectionKey);
      const batch = writeBatch(db);
  
      objectsToAdd.forEach((object) => {
        const newDocRef = doc(TaskCollectionRef); // Creating a new document reference
        batch.set(newDocRef, object);
      });
  
      await batch.commit();
      console.log('Documents added successfully!');
    } catch (error) {
      console.error('Error adding documents: ', error);
    }
  };