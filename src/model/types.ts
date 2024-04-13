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
  timeToRead: number
  mainImage: string
  author: User['_id']
  previewText: string
  content: string
  comments: Comment[]
}
