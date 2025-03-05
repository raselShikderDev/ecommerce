import mongoose, { trusted } from "mongoose";

const user = mongoose.Schema({
    _id:{
        type:String, 
        required:true
    },
    name:{
        type:String, 
        required:[true, 'Name is required'],
    },
    email:{
        type:String, 
        required:[true, 'Email is required'],
    },
    imgUrl:{
        type:String, 
        required:true,
    },
    cartItems:{
        type:Object,
        default:{}
    }
}, {minimize:false})

const userModel = mongoose.models.users || mongoose.model('users', user)
export default userModel