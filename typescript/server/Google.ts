import express,{Request,Response,NextFunction} from "express";
import {PROVIDER , AuthFactory } from "../src/Provider/AuthProvider";
import createHttpError from "http-errors";
const router = express.Router();
 
router.get("/token",(req:Request , res:Response , next : NextFunction)=>{

    const {
        code 
    } = req.query
 
    const provider  = AuthFactory.GetAuthProvider(PROVIDER.GMAIL_PROVIDER);
 
    provider?.getAccessToken(code+"")
    .then(token=>{  
         res.json({access_token : token});
    }).catch(err=>{ 
        res.status(400).json(err)
    })
  
})
 

router.get("/user",(req:Request , res:Response , next : NextFunction)=>{

    if(!req.headers["authorization"]) return next(403)

    const bearerToken = req.headers["authorization"].split(" ");
    
    if(Array.isArray(bearerToken) && bearerToken.length <= 0) return next(createHttpError(403));
    
    const token = bearerToken[1];

    const provider  = AuthFactory.GetAuthProvider(PROVIDER.GMAIL_PROVIDER);
 
    provider?.getUserInfo(token+"")
    .then(user=>{ 
        res.json({user})
    })
    .catch(err=>{
        res.status(400).json(err)
    })

  
})

export default router;
