// lib/firestoreHelpers.js

import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Fetch all documents from a specific collection
export const fetchCollectionData = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  
  const data = querySnapshot.docs.map(doc => doc);

  let newData = []
  data.forEach((doc) => {
    newData.push({'id': doc.id, ...doc.data()});
  });

  
  return newData;
};

export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateDocument = async (collectionName, docId, data) => {
  const docRef = doc(db, collectionName, docId);
  
  try {
    await updateDoc(docRef, data);
    console.log("Document updated successfully.");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
