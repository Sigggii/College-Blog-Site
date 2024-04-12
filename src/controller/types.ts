import { Comment, Post, User } from '../model/types'

export type SignUpUser = Omit<User, '_id' | 'role'>
export type UserSignIn = Omit<User, '_id' | 'role' | 'username'>
export type EditUser = Pick<User, 'username' | 'email'>

export type CreatePost = Omit<Post, '_id' | 'comments' | 'date'>
export type EditPost = CreatePost
export type AddComment = Omit<Comment, '_id' | 'date'> & { postID: string }

export type PostWithAuthor = Omit<Post, 'author'> & { author: User }
type CommentWithAuthor = Omit<Comment, 'author'> & { author: User }
export type PostWithAuthorAndCommentAuthor = Omit<PostWithAuthor, 'comments'> & {
  comments: CommentWithAuthor
}
