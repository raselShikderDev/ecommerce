import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
const cached = global.mongoose || { conn: null, promise: null };

if (!MONGODB_URI) {
  throw new Error("Define mongoDb envoirnment varribale first");
}

export default async function dbConnect() {
  try {
    if (cached.conn) {
      console.log("Mongodb already connected");
      return cached.conn;
    }
    if (!cached.promise) {
      console.log("Connecting to MongoDB with URI:", MONGODB_URI);

      // const options ={
      //     bufferCommands:false,
      // }
      // cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose)=>{
      //     console.log("Mongodb Connected Successfully")
      //     return mongoose
      // })
      cached.promise = mongoose
        .connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          bufferCommands: false,
        })
        .then((mongoose) => {
          console.log("MongoDB Connected Successfully");
          return mongoose;
        });
    }
    cached.conn = await cached.promise;
    global.mongoose = cached.conn;
    return cached.conn;
  } catch (error) {
    console.error("Connection faild: ", error.message);
    throw error;
  }
}
