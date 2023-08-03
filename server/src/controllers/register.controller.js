import { validationResult } from "express-validator";
import { jsonGenrate } from "../utils/helper.js";
import { statusCode, JWT_TOKEN_SECRET} from "../utils/constatnts.js";
import bcrypt from 'bcryptjs';
import User from "../models/User.js";
import { json } from "express";
import jwt from 'jsonwebtoken'

const Register = async (req,res)=>{
    console.log("Hell");
    const err = validationResult(req);
    // console.log(err,req.body);
    console.log(err);
    if(err.isEmpty()){
        const {name,username,password,email}=req.body;
        const hashPassword = await bcrypt.hash(password,10);
        // password=hashPassword;
        // console.log(req.body.name);
        const userExist = await User.findOne({
            $or:[{
                email:req.body.email
            },{
                username:req.body.username
            }]
        });
        if(userExist){
            return res.json(jsonGenrate(statusCode.UNPROCESSABLE_ENTITY,"User or Email Already Exist",[""]));
        }
        try {
            const result = await User.create({
                name:name,
                email:email,
                password:hashPassword,
                username:username,
            });
            const token = jwt.sign({userId:result._id},JWT_TOKEN_SECRET);
            console.log("Succ");
            res.json(jsonGenrate(statusCode.SUCCESS,"Registration Successfull",{userId:result._id,token:token}));
        } catch (error) {
            console.log(error);
        }
        return;
    }
    res.json(jsonGenrate(statusCode.VALIDATION_ERROR,"Validation error",err.mapped()));
}

export default Register;