import { Comment, Post, User } from '../model/types'

export type UserSignUp = Omit<User, '_id' | 'role'>
export type UserSignIn = Omit<User, '_id' | 'role' | 'username'>

export type CreatePost = Omit<Post, '_id' | 'comments' | 'date'>
export type AddComment = Omit<Comment, '_id' | 'date'> & { postID: string }
