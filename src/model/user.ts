import mongoose, { Model } from 'mongoose'
import { Role, User } from './types'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
export const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    enum: Role,
    required: true,
    trim: true,
    default: Role.USER,
  },
})

export const UserModel = mongoose.model<User>('User', UserSchema)
