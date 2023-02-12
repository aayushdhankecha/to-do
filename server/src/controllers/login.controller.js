import { validationResult } from "express-validator";
import { JWT_TOKEN_SECRET, statusCode } from "../utils/constatnts.js";
import { jsonGenrate } from "../utils/helper.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
const Login = async (req,res)=>{
    const err = validationResult(req);
    if(err.isEmpty()){
        const {username,password}=req.body;
        const user = await User.findOne({username:username});
        if(!user){
            return res.json(jsonGenrate(statusCode.UNPROCESSABLE_ENTITY,"Username or password is incorrect.",[""]));  
        }
        const verified = await bcrypt.compare(password,user.password);
        if(!verified){
            return res.json(jsonGenrate(statusCode.UNPROCESSABLE_ENTITY,"Username or password is incorrect.",[""]));
        }

        const token = jwt.sign({userId:user._id},JWT_TOKEN_SECRET);
        return res.json(jsonGenrate(statusCode.SUCCESS,"Login Successful",{userId:user._id,token:token}));
    }
    res.json(jsonGenrate(statusCode.VALIDATION_ERROR,"Validation Error",err.mapped()));
};

export default Login;