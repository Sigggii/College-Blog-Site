import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwt_identifier } from '../../Constants'
import { Error } from 'mongoose'
import { UserController } from '../../controller/userController'
import { Role, User } from '../../model/types'
import { AuthorizationError } from './AuthorizationError'

export type SecuredRoute = {
  path: string
  method: 'POST' | 'PUT' | 'DELETE' | 'GET'
  roles: Role[]
}

export type SecuredRoutes = SecuredRoute[]

export const Authenticator =
  (securedRoutes: SecuredRoutes) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.path)
    // set locals.loggedIn which is accessable by ejs templates to false. Will be set to true in case user is authenticated
    res.locals.loggedIn = false
    //Check if current route is secured, and if yes get route
    const securedRoute = securedRoutes.find((route) => isSecuredRoute(route.path, req.path))

    // If request contains jwt authenticate user
    if (jwt_identifier in req.cookies) {
      const isAuthenticated = await authenticate(req, res)
      //If isAuthenticated and securedRoute then check if User is Authorized
      if (isAuthenticated && securedRoute) {
        authorize(securedRoute, res.locals.user as User)
        return next()
      }
      // If request does NOT contain jwt check if route is secured. If so throw Unauthorized error
    } else {
      if (securedRoute) throw new AuthorizationError()
    }
    return next()
  }

//Return true if authenticated, else false
const authenticate = async (req: Request, res: Response): Promise<boolean> => {
  // Get jwt token
  const token = req.cookies[jwt_identifier]

  //Throw error if JWT_SECRET_KEY does not exist
  const jwt_secret = process.env.JWT_SECRET_KEY
  if (!jwt_secret) throw new Error('No JWT_SECRET_KEY env variable')

  try {
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload
    const user = await UserController.getUser(decoded.id)
    // If user to corresponding jwt doesn't exist anymore, delete jwt from clients cookies and return false
    if (!user) {
      res.status(401).clearCookie(jwt_identifier)
      return false
    }
    // set locals which are accessable in ejs templates
    res.locals.user = user
    res.locals.loggedIn = true
    return true
  } catch (err) {
    // If path not secured, return false
    return false
  }
}

/**
 * Check if user who made request is authorized to access securedRoute. If not throw Authorization Error
 *
 * @param securedRoute route against which user is checked
 * @param user user who should be checked if authorized
 *
 * @throws AuthorizationError if user is not authorized
 */
const authorize = (securedRoute: SecuredRoute, user: User) => {
  console.log(securedRoute)
  console.log(user.role)
  if (!securedRoute.roles.includes(user.role)) {
    throw new AuthorizationError()
  }
}

/**
 * Checks if givenPath (Regex Pattern) and actual path match
 *
 * @param givenPath Regex-Pattern
 * @param actualPath path which is checked against the givenPath Regex-Pattern
 *
 * @return true if both paths match, else false
 *
 */
const isSecuredRoute = (givenPath: string, actualPath: string) => {
  const regex = new RegExp(`^${givenPath}$`)
  return regex.test(actualPath)
}
