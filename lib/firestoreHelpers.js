// lib/firestoreHelpers.js

import { collection, getDocs, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

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
    updateDocument(collectionName, docRef.id, {id: docRef.id});
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

export const getDocumentById = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  
  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();

    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error fetching document: ", e);
    return null;
  }
};
