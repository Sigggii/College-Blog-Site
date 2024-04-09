import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwt_identifier } from '../../Constants'
import { Error } from 'mongoose'
import { UserController } from '../../controller/userController'

export const authentication =
  (restrictedRoutes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    if (!(jwt_identifier in req.cookies)) {
      res.locals.loggedIn = false
      if (restrictedRoutes.includes(req.path)) {
        return res.status(401).redirect('/signin')
      }
      return next()
    } else {
      try {
        const token = req.cookies[jwt_identifier]
        const jwt_secret = process.env.JWT_SECRET_KEY
        if (!jwt_secret) throw new Error('No JWT_SECRET_KEY env variable')
        const decoded = jwt.verify(token, jwt_secret) as JwtPayload
        const user = await UserController.getUser(decoded.id)
        // If user to corresponding jwt doesn't exist anymore, delete jwt from clients cookies
        if (!user) {
          return res.status(401).clearCookie(jwt_identifier)
        }
        // set locals accessable to ejs templates
        res.locals.user = user
        res.locals.loggedIn = true
        return next()
      } catch (err) {
        // set locals accessable to ejs templates
        res.locals.loggedIn = false
        // If path not secured, call next middleware
        if (!restrictedRoutes.includes(req.path)) {
          return next()
        }
        return res.status(401).redirect('/signin')
      }
    }
  }
