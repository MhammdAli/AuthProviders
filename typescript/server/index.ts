import express,{Request,Response,NextFunction ,Express} from "express";
import Env from "dotenv";
import {APP_PATH} from "../../config/App.Config";
import {join} from "path";
Env.config({
    path : join(APP_PATH,".env")
})

 
if(!process.env.GOOGLE_CLINET_ID) throw new Error("GOOGLE_CLINET_ID doesn't exists in .env file")
if(!process.env.GOOGLE_CLIENT_SECRET) throw new Error("GOOGLE_CLINET_SECRET doesn't exist in .env file")
if(!process.env.GITHUB_CLIENT_ID)  throw new Error("GITHUB_CLIENT_ID doesn't exists in .env file")
if(!process.env.GITHUB_CLIENT_SECRET) throw new Error("GITHUB_CLIENT_SECRET doesn't exist in .env file")

const app : Express = express();
app.use(express.json());
  
app.get("/",(req : Request,res : Response)=>{
    res.json({message : "Finshed"})
})
 
import GoogleApi from "./Google"
import Github from "./Github";
app.use("/google",GoogleApi);
app.use("/github",Github);

const PORT = process.env.APP_PORT;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})


app.use((err : any,req : Request,res : Response,next : NextFunction)=>{

    const status = err.code;

    res.status(status).json({message : err.message})
    
})