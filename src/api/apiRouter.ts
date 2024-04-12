import express from 'express'
import { userRouter } from './userRouter'
import { postRouter } from './postRouter'
import { authRouter } from './authRouter'

export const apiRouter = express.Router()

//add auth Router
apiRouter.use('/auth', authRouter)

// add user endpoints
apiRouter.use('/users', userRouter)

// add post endpoints
apiRouter.use('/posts', postRouter)
