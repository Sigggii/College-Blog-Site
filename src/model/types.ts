import { Types } from 'mongoose'

export enum Role {
  ADMIN,
  AUTHOR,
  USER,
}

export type User = {
  _id: Types.ObjectId
  username: string
  email: string
  password: string
  role: Role
}
