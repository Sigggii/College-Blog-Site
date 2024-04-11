import { Router, Request, Response, NextFunction } from 'express'
import { PostController } from '../controller/postContoller'
import { AddComment, CreatePost } from '../controller/types'

export const postRouter = Router()

postRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const post: CreatePost = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    category: req.body.category,
    timeToRead: req.body.timeToRead,
    mainImage: req.body.imageLink,
    author: res.locals.user.id,
    content: req.body.content,
  }
  //create Post
  const postId = await PostController.createPost(post)
  console.log(postId.toJSON())
  res.status(201).json({ postId: postId.toJSON() })
})

postRouter.post('/:postid/comment', async (req: Request, res: Response, next: NextFunction) => {
  const comment: AddComment = {
    author: res.locals.user.id,
    postID: req.params.postid,
    content: req.body.content,
  }

  await PostController.addComment(comment)
  res.status(201).end()
})

postRouter.put(
  '/:postid/comment/:commentid',
  async (req: Request, res: Response, next: NextFunction) => {
    const content = req.body.content
    const commentId = req.params.commentid

    console.log(content)
    console.log(commentId)

    await PostController.updateComment(commentId, content, res.locals.user)
    res.status(201).end()
  },
)

postRouter.delete(
  '/:postid/comment/:commentid',
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentid

    await PostController.deleteComment(commentId, res.locals.user)
    res.status(201).end()
  },
)