import { securedRoutes } from './securedRoutes'

require('express-async-errors')
import express, { Express, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { Authenticator } from './api/middleware/authentication'
import mongoose from 'mongoose'
import { apiRouter } from './api/apiRouter'
import ErrorHandler from './api/middleware/errorHandler'
import { PostController } from './controller/postContoller'
import { Role } from './model/types'
import { PostModel } from './model/post'

dotenv.config()

const mongodb_conn = process.env.MONGO_DB_CONNECTION_STRING
if (!mongodb_conn) {
  throw new Error('No MONGO_DB_CONNECTION_STRING env variable set')
}

mongoose.connect(mongodb_conn)

const app: Express = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

//expose public directory
app.use(express.static('public'))
app.use(express.json())

app.use(cookieParser())

// Check if user if authenticated and if not check if user tries to access restricted site
app.use('/', Authenticator(securedRoutes))

app.use('/api/v1', apiRouter)

app.get('/', async (req: Request, res: Response) => {
  const posts = await PostController.getResentPosts(10)
  res.render('pages/index', { posts: posts })
})

app.get('/signup', (req: Request, res: Response) => {
  res.render('pages/signup')
})

app.get('/signin', (req: Request, res: Response) => {
  res.render('pages/signin')
})

app.get('/create-post', (req: Request, res: Response) => {
  res.render('pages/create-post')
})

app.get('/admin-console', (req: Request, res: Response) => {
  res.render('pages/admin-console')
})

app.get('/posts/:id', async (req: Request, res: Response) => {
  const postID = req.params.id
  const post = await PostController.getPost(postID)
  res.render('pages/post', { post: post, Role: Role })
})

app.get('/all-posts', (req: Request, res: Response) => {
  res.render('pages/all-posts')
})

// Register Error Handler as last
app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
