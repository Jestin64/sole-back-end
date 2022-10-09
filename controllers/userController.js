import db from "../db.js";
import User from "../models/user.js";
import  { doc, setDoc, getDocs , getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable  } from "firebase/storage";
import multer from "multer";
// import File from "./image.jpg";

const dbs = getFirestore();
const storage = getStorage(db);
const ImageRef = ref(storage, 'test/nn-calculation.png');

export const addUser = async(req,res,next)=>{
    try {
        const data = req.body;
        console.log(data);
        await setDoc(doc(dbs, "Users", data.firstname), data) , {merge:true};
        res.status(200).send("Record Recieved");
    } catch (error) {
        res.status(400).send(error.message);
    }
}