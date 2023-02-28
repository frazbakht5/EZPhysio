import { Schema, model } from 'mongoose';
import * as uuid from 'node-uuid';
export interface IPatients {
  _id: string;
  full_name: string;
  email: string;
  phone_number: string;
  age: number;
  occupation: string;
  location: string;
  password: string;
  // yahan se neechay metadata hai
  token: string;
  imageUrl: string;
  auth_code?: string;
  plan_purchasing_date?: Date;
  plan_expiry_date?: Date;
  is_active: boolean;
  createdAt?: Date;
  updateAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IPatients>({
  _id: {
    type: String,
    required: true,
    default: uuid.v1,
  },
  full_name: {
    type: String,
    required: [true, 'Please Provide your full name'],
  },
  email: {
    type: String,
    required: [true, 'Please Provide your email'],
    unique: true,
    lowercase: true,
  },
  phone_number: {
    type: String,
    required: [true, 'Please Provide your phone number'],
    unique: true,
    lowercase: true,
  },
  age: {
    type: Number,
    required: [true, 'Please Provide your age'],
  },
  occupation: {
    type: String,
    lowercase: true,
  },
  location: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'PLease provide a password'],
  },
  token: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  auth_code: {
    type: String,
  },
  plan_purchasing_date: {
    type: Date,
  },
  plan_expiry_date: {
    type: Date,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Create a Model.
const Patients = model<IPatients>('Patients', schema);
export default Patients;
