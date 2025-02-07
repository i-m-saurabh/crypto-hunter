// import firebaseConfig from "./config/firebaseConfig";
import firebaseconf from "./config/firebaseconf";
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseconf);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export {auth, db};