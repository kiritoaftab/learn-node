import mongoose from "mongoose";

const testSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    age:Number,
    class:Number,
    gender:String,
  });


const Test = mongoose.model("test",testSchema);

export default Test;