import express from 'express'
import { userRouter } from './userRouter'
import { postRouter } from './postRouter'

export const apiRouter = express.Router()

// add user endpoints
apiRouter.use('/users', userRouter)

// add post endpoints
apiRouter.use('/posts', postRouter)
