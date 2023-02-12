import { validationResult } from "express-validator";
import todoSchema from "../models/todoSchema.js";
import { statusCode } from "../utils/constatnts.js";
import { jsonGenrate } from "../utils/helper.js";

export const markTodo = async (req,res)=>{
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.json(jsonGenrate(statusCode.VALIDATION_ERROR,"Todo id is required",err.mapped()));
    }
    try{
        const todo = await todoSchema.findOneAndUpdate({
            _id:req.body.todo_id,
            userId:req.userId,
        },[{
            $set:{
                isCompleted:{
                    $eq:[false, "$isCompleted"]
                }
            }
        }]);
        if(todo){
            return res.json(jsonGenrate(statusCode.SUCCESS,"Update Completed",todo));
        }
    }catch(e){
        return res.json(jsonGenrate(statusCode.UNPROCESSABLE_ENTITY,"could not update",e));
    }

};