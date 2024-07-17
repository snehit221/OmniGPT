// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYjC3rg8FPVwDiU6kfDCTCbNRqheRVebI",
  authDomain: "omnigpt-bf0f1.firebaseapp.com",
  projectId: "omnigpt-bf0f1",
  storageBucket: "omnigpt-bf0f1.appspot.com",
  messagingSenderId: "194161797202",
  appId: "1:194161797202:web:fd9b384cd56403eeac578b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export const storage = getStorage(app);
export default app;