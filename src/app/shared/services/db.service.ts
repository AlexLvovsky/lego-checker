import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { SearchResult } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private fireStore: Firestore) {}

  getUserSets(userId) {
    const sets = collection(this.fireStore, `users/${userId}/sets`);
    return collectionData(sets);
  }

  addSetToUserSets(userId: string, set: SearchResult) {
    // Get the reference to the "users" collection
    // const usersCollectionRef = collection(this.fireStore, 'users');

    // Create a reference to the user document using the user ID
    // const userDocRef = doc(this.fireStore, `users/${userId}`)
    // const userDocRef = usersCollectionRef.doc(userId);

    // Get the reference to the "sets" subcollection within the user document
    const userSetsCollectionRef = collection(this.fireStore, `users/${userId}/sets`);
    // const userSetsCollectionRef = userDocRef.collection('sets');

    // Create a new document in the "sets" subcollection with the set ID as the document ID
    // const setDocRef = doc(this.fireStore, `users/${userId}/sets${setId}`);
    // const setDocRef = userSetsCollectionRef.doc(setId);

    // You can also set additional data for the set document if needed
    const data = {
      // Set properties of the set, e.g., name, parts, etc.
      id: set.id,
      name: set.name,
    };

    addDoc(userSetsCollectionRef, data);

    // Set the data for the set document
    // return setDoc(setDocRef, data)
    // return setDocRef.set(data);
  }

  getMissingParts(userId, setId) {
    const missingParts = collection(this.fireStore, `users/${userId}/sets/${setId}/missingParts`);
    return collectionData(missingParts);
  }
}
