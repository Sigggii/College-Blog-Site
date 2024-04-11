import { UserSignIn, UserSignUp } from './types'
import { Role, User } from '../model/types'
import { UserModel, UserSchema } from '../model/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BlogSiteError } from '../api/middleware/BlogSiteError'
import mongoose from 'mongoose'

export type SignUpReturn = {
  user: User
}

export type SignInReturn = {
  jwt: string
}

type UserController = {
  signUp: (user: UserSignUp) => Promise<SignUpReturn>
  signIn: (user: UserSignIn) => Promise<SignInReturn>
  getUser: (userId: string) => Promise<User | null>
}

// Create new User
const signUp: UserController['signUp'] = async (user) => {
  const isEmailAlreadyUsed = await UserModel.exists({ email: user.email })
  if (isEmailAlreadyUsed) {
    throw new BlogSiteError('EMAIL_ALREADY_EXISTS')
  }
  const createdUser = await UserModel.create(user)
  return { user: createdUser }
}

// Check if given user password is the same as password saved in database
const signIn: UserController['signIn'] = async (user) => {
  const foundUser = await UserModel.findOne({ email: user.email })
  if (!foundUser) {
    throw new BlogSiteError('INVALID_CREDENTIALS')
  }

  if (bcrypt.compareSync(user.password, foundUser.password)) {
    const secret = process.env.JWT_SECRET_KEY
    if (!secret) throw new Error('No ENV-Variable for JWT_SECRET_KEY defined')
    const jwToken = jwt.sign({ id: foundUser._id }, secret, {
      expiresIn: process.env.JWT_EXPIRATION_TIME + 'h',
    })
    return { jwt: jwToken }
  }
  throw new BlogSiteError('INVALID_CREDENTIALS')
}

const getUser = async (userId: string): Promise<User | null> => {
  return UserModel.findOne({ _id: userId })
}

export const UserController: UserController = {
  signUp: signUp,
  signIn: signIn,
  getUser: getUser,
}
