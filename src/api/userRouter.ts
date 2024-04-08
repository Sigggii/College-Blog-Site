import { Router, Request } from 'express'
import { UserSignIn, UserSignUp } from '../controller/types'
import { UserController } from '../controller/userController'
import { jwt_identifier } from '../Constants'
import { data } from 'autoprefixer'

export const userRouter = Router()

userRouter.post('/signup', async (req, res, next) => {
  const authUser: UserSignUp = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }

  const signUpResult = await UserController.signUp(authUser)
  const signInResult = await UserController.signIn(authUser)

  // Setting jwt as http-only cookie (so its not accessible by javascript in browser)
  res.cookie(jwt_identifier, signInResult.jwt, {
    httpOnly: true,
    expires: new Date(Date.now() + Number(process.env.JWT_EXPIRATION_TIME) * 3600000),
    secure: true,
  })
  res.status(200).json({ data: signInResult })
})

userRouter.post('/signin', async (req, res, next) => {
  const authUser: UserSignIn = {
    email: req.body.email,
    password: req.body.password,
  }

  const signInResult = await UserController.signIn(authUser)
  // Setting jwt as http-only cookie (so its not accessible by javascript in browser)
  res.cookie(jwt_identifier, signInResult.jwt, {
    httpOnly: true,
    expires: new Date(Date.now() + Number(process.env.JWT_EXPIRATION_TIME) * 3600000),
    secure: true,
    sameSite: 'strict',
  })
  res.status(200).json({ data: signInResult })
})

userRouter.post('/signout', async (req, res, next) => {
  res.status(200).clearCookie(jwt_identifier).json({ test: 'Test' })
})
