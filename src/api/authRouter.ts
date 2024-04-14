import { Router } from 'express'
import { SignUpUser, UserSignIn } from '../controller/types'
import { UserController } from '../controller/userController'
import { jwt_identifier } from '../Constants'

export const authRouter = Router()

//signup endpoint
authRouter.post('/signup', async (req, res, next) => {
  const authUser: SignUpUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }

  // First sign up the user and then sign in the user
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

//signin endpoint
authRouter.post('/signin', async (req, res, next) => {
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

//signout endpoint
authRouter.post('/signout', async (req, res, next) => {
  res.status(200).clearCookie(jwt_identifier).json({ test: 'Test' })
})
