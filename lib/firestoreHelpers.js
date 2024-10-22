// lib/firestoreHelpers.js

import { collection, getDocs, addDoc, doc, updateDoc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';
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
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addClass = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    updateDocument(collectionName, docRef.id, {id: docRef.id, joinCode: docRef.id.slice(0, 4)});

    return docRef.id;
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
      return {};
    }
  } catch (e) {
    console.error("Error fetching document: ", e);
    return {};
  }
};

export const deleteDocument = async (collection, docId) => {
  const docRef = doc(db, collection, docId);
  await deleteDoc(docRef);
};


export const onRegister = async (user, name, role) => {

  const uid = user.uid;
  const docRef = setDoc(doc(db, 'users', uid), {
    name: name,
    role: role,
    classes: [],
  }).then(() => {
    console.log("Written to document with id: ", docRef.id);
  });
};