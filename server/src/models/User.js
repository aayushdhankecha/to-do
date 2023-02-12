import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
        min:6,
        max:32,
        require:true,
    },
    password:{
        type:String,
        min:6,
        max:100,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo",
    }],
});

export default mongoose.model("User",userSchema);