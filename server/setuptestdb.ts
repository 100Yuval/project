import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';


let mongo: any = null;
 
const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
 
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
};

const dropDB = async () => {
    if (mongo) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongo.stop();
    }
  };

 export default {
  connectDB,
  dropDB
 }
