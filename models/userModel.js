import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id:{
    type:String, 
    required:true,
},
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  imgUrl: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Object,
    default: {}
  }
}, { minimize: false });

const userModel = mongoose.models.users || mongoose.model('users', userSchema);
export default userModel;