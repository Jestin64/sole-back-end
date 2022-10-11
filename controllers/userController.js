import db from "../db.js";
import User from "../models/user.js";
import  { doc, setDoc, getDocs , getFirestore , collection, query, where,} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable  } from "firebase/storage";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import File from "./image.jpg";

const dbs = getFirestore();
const storage = getStorage(db);
const ImageRef = ref(storage, 'test/nn-calculation.png');

export const addUser = async(req,res,next)=>{
    try {
        const data = req.body;
        // const q = query(collection(dbs, "Users"), where("email", "==", data.email));
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     if(doc.data()){
        //       return  res.status(400).send("User exists");
        //     }
        //   });

        const hashedPassword = await bcrypt.hash(data?.password, 12);
        data.password = hashedPassword;
        
        // console.log("Already exists", querySnapshot);
        await setDoc(doc(dbs, "Users", data.firstname), data) , {merge:true};
        res.status(200).send("Record Recieved");
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}


export const login = async(req,res,next)=>{
    try {
        const {email , password} = req.body;
        const q = query(collection(dbs, "Users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(doc) => {const existingUser = doc.data()
                if (!existingUser.email) return res.status(404).json({message:"User not found"});
        const authenticate = await bcrypt.compare(password, existingUser.password);

        if(!authenticate){
                return res.status(403).json({message:"Wrong Password"});
            } else{
            const token = jwt.sign({email:existingUser.email},"SOLE",{expiresIn : "1hr"})
             return res.status(200).json({user:existingUser, token});
            }
        });
        // if (!existingUser.email) return res.status(404).json({message:"User not found"});
          
        // const authenticate = await bcrypt.compare(password, existinguser.password);
        // if(!authenticate){
        //     return res.status(403).json({message:"Wrong Password"});
        // } else{

        //  return res.status(200).send("user Found");
        // }
    
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}