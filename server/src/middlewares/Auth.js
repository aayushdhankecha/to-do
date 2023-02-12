import { JWT_TOKEN_SECRET, statusCode } from "../utils/constatnts.js";
import { jsonGenrate } from "../utils/helper.js";
import jwt from 'jsonwebtoken'
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const AuthMiddleware = async (req,res,next)=>{
    console.log("Auther",req.headers);
    // localStorage
    if(req.headers['auth']===undefined){
        return res.json(jsonGenrate(statusCode.AUTH_ERROR,"Access Denied",[""]));
    }
    const token = req.headers['auth'];
    try{
        const decoded = jwt.verify(token,process.env.JWT_TOKEN_SECRET);
        // decoded = JSON.stringify(decoded);
        // console.log("ID",decoded.userId);
        req.userId=decoded.userId;
        console.log(req.body.todo_id);
        // console.log("ID2",req.userID);
        return next();
    }catch(e){
        return res.json(jsonGenrate(statusCode.UNPROCESSABLE_ENTITY,"Invalid Token",[""]));
    }
};

export default AuthMiddleware;