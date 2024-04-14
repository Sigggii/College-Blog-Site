import { Router, Request, Response, NextFunction } from 'express'
import { PostController } from '../controller/postContoller'
import { AddComment, CreatePost } from '../controller/types'

export const postRouter = Router()

// endpoint to create post
postRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const post: CreatePost = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    category: req.body.category,
    timeToRead: req.body.timeToRead,
    mainImage: req.body.imageLink,
    author: res.locals.user.id,
    previewText: req.body.previewText,
    content: req.body.content,
  }
  //create Post
  const postId = await PostController.createPost(post)
  res.status(201).json({ postId: postId.toJSON() })
})

// endpoint to update post
postRouter.put('/:postid', async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postid
  const editData: CreatePost = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    category: req.body.category,
    timeToRead: req.body.timeToRead,
    mainImage: req.body.imageLink,
    author: res.locals.user.id,
    previewText: req.body.previewText,
    content: req.body.content,
  }
  const user = res.locals.user
  await PostController.editPost(postId, editData, user)
  res.status(200).end()
})

// endpoint to delete a post
postRouter.delete('/:postid', async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postid
  const user = res.locals.user
  await PostController.deletePost(postId, user)
  res.status(200).end()
})

// endpoint create comment for post
postRouter.post('/:postid/comment', async (req: Request, res: Response, next: NextFunction) => {
  const comment: AddComment = {
    author: res.locals.user.id,
    postID: req.params.postid,
    content: req.body.content,
  }

  await PostController.addComment(comment)
  res.status(201).end()
})

// endpoint to update comment
postRouter.put(
  '/:postid/comment/:commentid',
  async (req: Request, res: Response, next: NextFunction) => {
    const content = req.body.content
    const commentId = req.params.commentid

    await PostController.updateComment(commentId, content, res.locals.user)
    res.status(201).end()
  },
)

// endpoint to delete comment
postRouter.delete(
  '/:postid/comment/:commentid',
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentid

    await PostController.deleteComment(commentId, res.locals.user)
    res.status(201).end()
  },
)
