import { UserSignIn, SignUpUser, EditUser } from './types'
import { User } from '../model/types'
import { UserModel } from '../model/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BlogSiteError } from '../api/middleware/BlogSiteError'
import { PostModel } from '../model/post'

export type SignUpReturn = {
  user: User
}

export type SignInReturn = {
  jwt: string
}

type UserController = {
  signUp: (user: SignUpUser) => Promise<SignUpReturn>
  signIn: (user: UserSignIn) => Promise<SignInReturn>
  getUser: (userId: string) => Promise<User | null>
  getAllUsers: () => Promise<User[]>
  deleteUser: (userId: string) => Promise<void>
  editUser: (userId: string, editData: EditUser) => Promise<void>
  changePassword: (userId: string, password: string) => Promise<void>
}

// saltRound for bcrypt
const saltRounds = 10

/**
 * Create / Signup a new User
 * @param user
 */
const signUp: UserController['signUp'] = async (user) => {
  const isEmailAlreadyUsed = await UserModel.exists({ email: user.email })
  if (isEmailAlreadyUsed) {
    throw new BlogSiteError('EMAIL_ALREADY_EXISTS')
  }
  // hash password before saving it to database to ensure passwords of users cant be leaked
  const userWithHash = { ...user }
  userWithHash.password = bcrypt.hashSync(user.password, saltRounds)
  const createdUser = await UserModel.create(userWithHash)
  return { user: createdUser }
}

/**
 * Sign in a user
 * @param user
 */
const signIn: UserController['signIn'] = async (user) => {
  // Check if given user password is the same as password saved in database
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

/**
 * Get a user by userId
 * @param userId
 */
const getUser: UserController['getUser'] = async (userId: string): Promise<User | null> => {
  return UserModel.findOne({ _id: userId })
}

/**
 *  Get all users
 */
const getAllUser: UserController['getAllUsers'] = async () => {
  return await UserModel.find().sort({ email: -1 }).exec()
}

/**
 * Delete a user
 * @param userId
 */
const deleteUser: UserController['deleteUser'] = async (userId: string) => {
  // Delete all Posts of the user before deleting the user
  await PostModel.deleteMany({ author: userId })
  await UserModel.findOneAndDelete({ _id: userId }).exec()
}

/**
 * Edit a user
 * @param userId
 * @param editData
 */
const editUser: UserController['editUser'] = async (userId: string, editData: EditUser) => {
  const userToEdit = await UserModel.findOne({ _id: userId })
  if (!userToEdit) throw new BlogSiteError('POST_NOT_FOUND')
  Object.assign(userToEdit, editData)
  await userToEdit.save()
}

/**
 * Change password of a user
 * @param userId
 * @param password
 */
const changePassword: UserController['changePassword'] = async (userId: string, password) => {
  const passwordHash = bcrypt.hashSync(password, saltRounds)
  await UserModel.findOneAndUpdate({ _id: userId }, { $set: { password: passwordHash } })
}

export const UserController: UserController = {
  signUp: signUp,
  signIn: signIn,
  getUser: getUser,
  getAllUsers: getAllUser,
  deleteUser: deleteUser,
  editUser: editUser,
  changePassword: changePassword,
}
