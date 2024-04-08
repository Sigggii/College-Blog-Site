import express from 'express'
import { userRouter } from './userRouter'

export const apiRouter = express.Router()

apiRouter.use('/users', userRouter)
