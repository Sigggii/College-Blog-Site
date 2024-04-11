import { ErrorName } from './BlogSiteError'

export class AuthorizationError extends Error {
  name: string

  constructor() {
    super()
    this.name = 'AUTHORIZATION_ERROR'
  }
}
