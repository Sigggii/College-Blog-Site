import { AddComment, CreatePost } from './types'
import { PostModel } from '../model/post'
import { Post, Role, User } from '../model/types'
import { BlogSiteError } from '../api/middleware/BlogSiteError'
import { Types } from 'mongoose'
import { AuthorizationError } from '../api/middleware/AuthorizationError'

type PostContoller = {
  createPost: (post: CreatePost) => Promise<Types.ObjectId>
  getPost: (postID: string) => Promise<Post>
  addComment: (comment: AddComment) => Promise<void>
  updateComment: (commentId: string, content: string, requestUser: User) => Promise<void>
  deleteComment: (commentId: string, requestUser: User) => Promise<void>
  getResentPosts: (number: number) => Promise<Post[]>
}

const createPost: PostContoller['createPost'] = async (post: CreatePost) => {
  const createdPost = await PostModel.create(post)
  return createdPost._id
}

const getPost: PostContoller['getPost'] = async (postID: string) => {
  const post = await PostModel.findById({ _id: postID })
    .populate('author')
    .populate('comments.author')
  if (!post) throw new BlogSiteError('POST_NOT_FOUND')
  return post
}

const addComment: PostContoller['addComment'] = async (comment: AddComment) => {
  await PostModel.findByIdAndUpdate(comment.postID, { $push: { comments: comment } })
}

const updateComment: PostContoller['updateComment'] = async (
  commentId: string,
  content: string,
  requestUser: User,
) => {
  // check if comment with given commentid belongs to user who made the request or user is admin ->
  // ensure that no one else can edit command
  const checkPost = await PostModel.findOne({
    'comments._id': commentId,
    'comments.author': requestUser._id,
  })
  if (!checkPost && requestUser.role !== Role.ADMIN) {
    throw new AuthorizationError()
  }

  await PostModel.findOneAndUpdate(
    { 'comments._id': commentId },
    { $set: { 'comments.$': { content: content } } },
  )
}

const deleteComment: PostContoller['deleteComment'] = async (
  commentId: string,
  requestUser: User,
) => {
  // check if comment with given commentid belongs to user who made the request or user is admin ->
  // ensure that no one else can edit command
  const checkPost = await PostModel.findOne({
    'comments._id': commentId,
    'comments.author': requestUser._id,
  })
  if (!checkPost && requestUser.role !== Role.ADMIN) {
    throw new AuthorizationError()
  }

  await PostModel.updateOne(
    { 'comments._id': commentId },
    { $pull: { comments: { _id: commentId } } },
  )
}

const getRescentPosts: PostContoller['getResentPosts'] = async (number: number) => {
  return await PostModel.find().sort({ date: -1 }).limit(number).populate('author').exec()
}

export const PostController: PostContoller = {
  createPost: createPost,
  getPost: getPost,
  addComment: addComment,
  updateComment: updateComment,
  deleteComment: deleteComment,
  getResentPosts: getRescentPosts,
}
