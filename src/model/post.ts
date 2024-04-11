import mongoose from 'mongoose'
import { Post } from './types'

const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { autoCreate: false },
)

export const CommentModel = mongoose.model<Comment>('Comment', CommentSchema)

export const PostSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  timeToRead: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  previewText: {
    type: String,
    required: true,
    maxLength: 200,
  },
  content: {
    type: String,
    required: true,
  },
  comments: {
    type: [CommentSchema],
    default: [],
  },
})

export const PostModel = mongoose.model<Post>('Post', PostSchema)
