import { Types } from 'mongoose'

export enum Role {
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR',
  USER = 'USER',
}

export type User = {
  _id: Types.ObjectId
  username: string
  email: string
  password: string
  role: Role
}

export type Comment = {
  _id: Types.ObjectId
  date: Date
  author: User['_id']
  content: string
}

export type Post = {
  _id: Types.ObjectId
  date: Date
  title: string
  subtitle: string
  category: string
  timeToRead: string
  mainImage: string
  author: User['_id']
  content: string
  comments: Comment[]
}
