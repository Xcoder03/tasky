import { obtainToken } from "../utils/obtainToken.js";
import { verifyToken } from "../utils/verifyToken.js";

export const  isLogin = (req, res, next) => {
    const token = obtainToken(req);
    const  userDecoded = verifyToken(token)
    req.userAuth = userDecoded.id;
    if(!userDeCoded){
        return res.json({
            status:"error",
            message:"Kindly login in, because it seems the token is either expired or invalid"
        })
      }else{
        next()
      } 
}