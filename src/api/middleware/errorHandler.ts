import { Request, Response, NextFunction } from 'express'
import { BlogSiteError } from './BlogSiteError'
import { AuthorizationError } from './AuthorizationError'

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if (err instanceof BlogSiteError) {
    return res
      .status(err.status)
      .json({ type: 'BLOG_SITE_ERROR', name: err.name, message: err.message })
  } else if (err instanceof AuthorizationError) {
    //If request was made over api, send json error else send error page
    if (req.path.startsWith('/api')) {
      return res.status(401).json({
        type: 'AUTHORIZATION_ERROR',
        name: 'AUTHORIZATION_ERROR',
        message: 'You are not authorized to use that!',
      })
    } else {
      return res.status(401).render('pages/not-authorized')
    }
  } else {
    return res
      .status(500)
      .json({ type: 'unknown-error', name: 'UNKOWN_ERROR', message: 'Unexcpeted error occured' })
  }
}

export default ErrorHandler
