import { securedRoutes } from './securedRoutes'

require('express-async-errors')
import express, { Express, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { Authenticator } from './api/middleware/authentication'
import mongoose from 'mongoose'
import { apiRouter } from './api/apiRouter'
import ErrorHandler from './api/middleware/errorHandler'
import { PostController, PostFilter } from './controller/postContoller'
import { Role } from './model/types'
import { PostModel } from './model/post'
import { getPageCount, getPostsForGivenPage } from './utils/postUtils'
import { UserController } from './controller/userController'

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
  const posts = await PostController.getLastNPosts(10)
  res.render('pages/index', { posts: posts })
})

app.get('/signup', (req: Request, res: Response) => {
  res.render('pages/signup')
})

app.get('/signin', (req: Request, res: Response) => {
  res.render('pages/signin')
})

app.get('/create-post', async (req: Request, res: Response) => {
  const postId = req.query.postId as string | undefined
  if (!postId) {
    res.render('pages/create-post', { isEdit: false })
  } else {
    const post = await PostController.getPost(postId)
    res.render('pages/create-post', { editPost: post, isEdit: true })
  }
})

app.get('/admin-console', async (req: Request, res: Response) => {
  const allPosts = await PostController.getAllPosts()
  const postsLastDay = await PostController.getPostsOfLastDay()
  const allUsers = await UserController.getAllUsers()
  res.render('pages/admin-console', {
    allPosts: allPosts,
    postsLastDay: postsLastDay,
    allUsers: allUsers,
  })
})

app.get('/posts/:id', async (req: Request, res: Response) => {
  const postID = req.params.id
  const post = await PostController.getPost(postID)
  res.render('pages/post', { post: post, Role: Role })
})

app.get('/all-posts', async (req: Request, res: Response) => {
  const filter: PostFilter = {
    title: {
      value: req.query.title as string,
      strict: false,
    },
    category: {
      value: req.query.category as string,
      strict: true,
    },
    author: {
      value: req.query.author as string,
      strict: true,
    },
  }
  const pageNumber = req.query.page ? Number(req.query.page) : 1

  const posts = await PostController.getFilteredPosts(filter)
  const postsOnPage = getPostsForGivenPage(posts, pageNumber)
  const pageCount = getPageCount(posts)
  const allAuthors = await PostController.getAllAuthors()
  const allCategories = await PostController.getAllCategories()
  res.render('pages/all-posts', {
    posts: postsOnPage,
    filter: filter,
    allAuthors: allAuthors,
    allCategories: allCategories,
    pageNumber: pageNumber,
    pageCount: pageCount,
  })
})

// Register Error Handler as last
app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
