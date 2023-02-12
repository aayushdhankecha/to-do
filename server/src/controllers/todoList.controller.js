import User from "../models/User.js"
import { statusCode } from "../utils/constatnts.js";
import { jsonGenrate } from "../utils/helper.js";

export const GetList = async (req,res)=>{
    try{
        const list = await User.findById(req.userId)
        .select("-password")
        .populate("todos")
        .exec();

        return res.json(jsonGenrate(statusCode.SUCCESS,"All todo list",list));
    
    }catch(e){
        return res.json(jsonGenrate(statusCode.UNPROCESSABLE_ENTITY,"Error",e));
    }
}