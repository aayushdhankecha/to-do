import { validationResult } from "express-validator";
import todoSchema from "../models/todoSchema.js";
import User from "../models/User.js";
import { statusCode } from "../utils/constatnts.js";
import { jsonGenrate } from "../utils/helper.js";

export const dltTodo = async (req,res)=>{
    console.log("TODOID",req.headers["todo_id"]);
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.json(jsonGenrate(statusCode.VALIDATION_ERROR,"Todo id is required",err.mapped()));
    }
    try{
        const todo = await todoSchema.findOneAndDelete({
            _id:req.body.todo_id,
            userId:req.userId,
        });
        if(todo){
            const user = await User.findByIdAndUpdate(
                {
                    _id:req.userId,
                },
                {$pull: {todos:req.body.todo_id}}
            );
            return res.json(jsonGenrate(statusCode.SUCCESS,"Deleted",todo));
        }
    }catch(e){
        return res.json(jsonGenrate(statusCode.UNPROCESSABLE_ENTITY,"could not delete",e));
    }
};