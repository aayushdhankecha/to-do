import { validationResult } from "express-validator";
import todoSchema from "../models/todoSchema.js";
import User from "../models/User.js";
import { statusCode } from "../utils/constatnts.js";
import { jsonGenrate } from "../utils/helper.js";

const todocontroll = async (req,res)=>{
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.json(jsonGenrate(statusCode.VALIDATION_ERROR,"Todo is required",err.mapped()));
    }
    console.log("ok " + req.userId);
    try{
        const result = await todoSchema.create({
            userId:req.userId,
            desc:req.body.desc,
        });
        if(result){
            const user = await User.findOneAndUpdate({_id:req.userId},
                {
                    $push:{todos:result},
                });
            return res.json(jsonGenrate(statusCode.SUCCESS,"Todo created Successfully",result));
        }
    }
    catch(e){
        
        return res.json(jsonGenrate(statusCode.UNPROCESSABLE_ENTITY,"Something went wrong",e));
    }
};

export default todocontroll;