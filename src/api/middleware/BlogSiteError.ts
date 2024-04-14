export type ErrorName =
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_ALREADY_EXISTS'
  | 'POST_NOT_FOUND'
  | 'USER_NOT_FOUND'

type ErrorInfo = {
  status: number
  message: string
}

// Error messages and status codes
const errors: Record<ErrorName, ErrorInfo> = {
  INVALID_CREDENTIALS: { status: 401, message: 'Please check if your credentials are correct' },
  EMAIL_ALREADY_EXISTS: { status: 400, message: 'Please use another email' },
  POST_NOT_FOUND: { status: 404, message: 'Post not found' },
  USER_NOT_FOUND: { status: 404, message: 'User not found' },
}

/** BlogSiteError
 *  Error class for BlogSite
 */
export class BlogSiteError extends Error {
  name: ErrorName
  status: number
  message: string

  constructor(name: ErrorName) {
    super()
    this.name = name
    this.status = errors[name].status
    this.message = errors[name].message
  }
}
