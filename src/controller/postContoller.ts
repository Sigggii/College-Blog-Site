import {
  AddComment,
  CreatePost,
  EditPost,
  PostWithAuthor,
  PostWithAuthorAndCommentAuthor,
} from './types'
import { PostModel } from '../model/post'
import { Post, Role, User } from '../model/types'
import { BlogSiteError } from '../api/middleware/BlogSiteError'
import { Types } from 'mongoose'
import { AuthorizationError } from '../api/middleware/AuthorizationError'
import { UserModel } from '../model/user'

type FilterOption<T, K extends boolean> = {
  value: T
  strict: K
}

export type PostFilter = {
  title?: FilterOption<string, false>
  author?: FilterOption<string, true>
  category?: FilterOption<string, true>
}

type PostContoller = {
  createPost: (post: CreatePost) => Promise<Types.ObjectId>
  getPost: (postID: string) => Promise<PostWithAuthorAndCommentAuthor>
  editPost: (postID: string, editData: EditPost, requestUser: User) => Promise<void>
  deletePost: (postId: string, requestUser: User) => Promise<void>
  addComment: (comment: AddComment) => Promise<void>
  updateComment: (commentId: string, content: string, requestUser: User) => Promise<void>
  deleteComment: (commentId: string, requestUser: User) => Promise<void>
  getPostsOfLastDay: () => Promise<PostWithAuthor[]>
  getLastNPosts: (number: number) => Promise<PostWithAuthor[]>
  getAllPosts: () => Promise<PostWithAuthor[]>
  getFilteredPosts: (filter: PostFilter) => Promise<PostWithAuthor[]>
  getAllAuthors: () => Promise<User[]>
  getAllCategories: () => Promise<String[]>
}

/**
 * Create a post
 * @param post
 */
const createPost: PostContoller['createPost'] = async (post: CreatePost) => {
  const createdPost = await PostModel.create(post)
  return createdPost._id
}

/**
 * Get a post by postID
 * @param postID
 */
const getPost: PostContoller['getPost'] = async (postID: string) => {
  const post = await PostModel.findById({ _id: postID })
    .populate('author')
    .populate('comments.author')
  if (!post) throw new BlogSiteError('POST_NOT_FOUND')
  return post as unknown as PostWithAuthorAndCommentAuthor
}

/**
 * Edit a post
 * @param postID
 * @param editData
 * @param requestUser
 */
const editPost: PostContoller['editPost'] = async (
  postID: string,
  editData: EditPost,
  requestUser: User,
) => {
  // check if post with given postid belongs to user who made the request or user is admin ->
  // ensure that no one else can edit post ToDo auslagern, wird ganz oft verwendet
  const checkPost = PostModel.findOne({ _id: postID, author: requestUser._id })
  if (!checkPost && requestUser.role !== Role.ADMIN) {
    throw new AuthorizationError()
  }

  const postToEdit = await PostModel.findOne({ _id: postID })
  if (!postToEdit) throw new BlogSiteError('POST_NOT_FOUND')
  Object.assign(postToEdit, editData)
  postToEdit.save()
}

/**
 * Delete a post
 * @param postID
 * @param requestUser
 */
const deletePost: PostContoller['deletePost'] = async (postID: string, requestUser: User) => {
  // check if post with given postid belongs to user who made the request or user is admin ->
  // ensure that no one else can delete post
  const checkPost = PostModel.findOne({ _id: postID, author: requestUser._id })
  if (!checkPost && requestUser.role !== Role.ADMIN) {
    throw new AuthorizationError()
  }
  await PostModel.findOneAndDelete({ _id: postID }).exec()
}

/**
 * Add a comment to a post
 * @param comment
 */
const addComment: PostContoller['addComment'] = async (comment: AddComment) => {
  await PostModel.findByIdAndUpdate(comment.postID, { $push: { comments: comment } })
}

/**
 * Update a comment
 * @param commentId
 * @param content
 * @param requestUser
 */
const updateComment: PostContoller['updateComment'] = async (
  commentId: string,
  content: string,
  requestUser: User,
) => {
  // check if comment with given commentid belongs to user who made the request or user is admin ->
  // ensure that no one else can edit comment
  const checkPost = await PostModel.findOne({
    'comments._id': commentId,
    'comments.author': requestUser._id,
  })
  if (!checkPost && requestUser.role !== Role.ADMIN) {
    throw new AuthorizationError()
  }

  await PostModel.findOneAndUpdate(
    { 'comments._id': commentId },
    { $set: { 'comments.$.content': content } },
  )
}

/**
 * Delete a comment
 * @param commentId
 * @param requestUser
 */
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

/**
 * Get all posts of the last day
 */
const getPostsOfLastDay: PostContoller['getPostsOfLastDay'] = async () => {
  const now = new Date()
  const date24HoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  return (await PostModel.find({ date: { $gte: date24HoursAgo, $lte: now } })
    .populate('author')
    .exec()) as unknown as PostWithAuthor[]
}

/**
 * Get the last N posts
 * @param number
 */
const getLastNPosts: PostContoller['getLastNPosts'] = async (number: number) => {
  return (await PostModel.find()
    .sort({ date: -1 })
    .limit(number)
    .populate('author')
    .exec()) as unknown as PostWithAuthor[]
}

/**
 * Get all posts
 */
const getAllPosts: PostContoller['getAllPosts'] = async () => {
  return (await PostModel.find()
    .sort({ date: 1 })
    .populate('author')
    .exec()) as unknown as PostWithAuthor[]
}

/**
 * get all posts that match the filter
 * @param filter
 */
const getFilteredPosts: PostContoller['getFilteredPosts'] = async (filter: PostFilter) => {
  const query = getQueryForFilteredPost(filter)
  return (await PostModel.find(query)
    .sort({ date: -1 })
    .populate('author')
    .exec()) as unknown as PostWithAuthor[]
}

/**
 * Get all authors
 */
const getAllAuthors: PostContoller['getAllAuthors'] = async () => {
  const authorIds = await PostModel.find().distinct('author').exec()
  return await UserModel.find({ _id: { $in: authorIds } }).exec()
}

/**
 * Get all categories
 */
const getAllCategories: PostContoller['getAllCategories'] = async () => {
  return await PostModel.find().distinct('category').exec()
}

/**
 * Get query for filtered post
 * @param filter
 */
const getQueryForFilteredPost = (filter: PostFilter) => {
  return Object.fromEntries(
    Object.entries(filter)
      .filter(([key, value]) => {
        return value.value
      })
      .map(([key, value]) => {
        if (value.strict) {
          return [key, value.value]
        } else {
          return [key, { $regex: `^${value.value}`, $options: 'i' }]
        }
      }),
  )
}

export const PostController: PostContoller = {
  createPost: createPost,
  getPost: getPost,
  editPost: editPost,
  deletePost: deletePost,
  addComment: addComment,
  updateComment: updateComment,
  deleteComment: deleteComment,
  getPostsOfLastDay: getPostsOfLastDay,
  getLastNPosts: getLastNPosts,
  getAllPosts: getAllPosts,
  getFilteredPosts: getFilteredPosts,
  getAllAuthors: getAllAuthors,
  getAllCategories: getAllCategories,
}
