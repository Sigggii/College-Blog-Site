import { ErrorName } from './BlogSiteError'

/** AuthorizationError
 * Error thrown when user is not authorized to access a secured route
 */
export class AuthorizationError extends Error {
  name: string

  constructor() {
    super()
    this.name = 'AUTHORIZATION_ERROR'
  }
}
