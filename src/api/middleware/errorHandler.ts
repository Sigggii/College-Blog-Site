import { Request, Response, NextFunction } from 'express'
import { BlogSiteError } from './BlogSiteError'

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if (err instanceof BlogSiteError) {
    res.status(err.status).json({ type: 'blog-site-error', name: err.name, message: err.message })
  } else {
    res
      .status(500)
      .json({ type: 'unknown-error', name: 'UNKOWN_ERROR', message: 'Unexcpeted error occured' })
  }
}

export default ErrorHandler
