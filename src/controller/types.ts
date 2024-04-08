import { User } from '../model/types'

export type UserSignUp = Omit<User, '_id' | 'role'>
export type UserSignIn = Omit<User, '_id' | 'role' | 'username'>
