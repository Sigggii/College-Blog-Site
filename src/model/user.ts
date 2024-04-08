import mongoose, { Model } from 'mongoose'
import { Role, User } from './types'
import bcrypt from 'bcrypt'

// saltRound for bcrypt
const saltRounds = 10

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

// hash password before saving it to database to ensure passwords of users cant be leaked
UserSchema.pre('save', function (next) {
  const user = this as unknown as User

  user.password = bcrypt.hashSync(user.password, saltRounds)
  next()
})

export const UserModel = mongoose.model<User>('User', UserSchema)
