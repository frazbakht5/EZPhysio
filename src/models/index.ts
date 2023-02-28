import * as mongoose from 'mongoose';

async function connectToDatabase(): Promise<boolean> {
  console.log('Connecting to db...');

  mongoose.set('strictQuery', true);
  return await mongoose
    .connect('mongodb://127.0.0.1:27017/EZPhysio')
    .then(() => {
      const msgType = `Mongoose`;
      const message = `Mongoose connection has been established successfully.`;
      console.log(msgType, message);
      return true;
    })
    .catch((err: any) => {
      const errType = `Mangoose Error:`;
      const message = `Unable to connect to the database`;
      console.log(errType, message, err);
      return false;
    });
}

export { connectToDatabase };
