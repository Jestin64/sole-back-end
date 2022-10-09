import {initializeApp} from "firebase/app";
import config from "./config.js"; 

const db=initializeApp(config.firebaseConfig);

export default db;

