import { SecuredRoutes } from './api/middleware/authentication'
import { Role } from './model/types'

// Set all secured Routes of server
// For path params use api/*/blabla to make all requests independent of the path param secured
export const securedRoutes: SecuredRoutes = [
  { path: '/create-post', method: 'GET', roles: [Role.AUTHOR, Role.ADMIN] },
  { path: '/admin-console', method: 'GET', roles: [Role.ADMIN] },
  { path: '/api/v1/posts', method: 'POST', roles: [Role.AUTHOR, Role.ADMIN] },
  { path: '/api/v1/posts/*', method: 'PUT', roles: [Role.AUTHOR, Role.ADMIN] },
  { path: '/api/v1/posts/*', method: 'DELETE', roles: [Role.AUTHOR, Role.ADMIN] },

  {
    path: '/api/v1/posts/*/comment',
    method: 'POST',
    roles: [Role.USER, Role.AUTHOR, Role.ADMIN],
  },
  {
    path: '/api/v1/posts/*/comment/*',
    method: 'PUT',
    roles: [Role.USER, Role.AUTHOR, Role.ADMIN],
  },
  {
    path: '/api/v1/posts/*/comment/*',
    method: 'DELETE',
    roles: [Role.USER, Role.AUTHOR, Role.ADMIN],
  },
  {
    path: '/api/v1/users/*',
    method: 'DELETE',
    roles: [Role.ADMIN],
  },
  {
    path: '/api/v1/users/*',
    method: 'PUT',
    roles: [Role.ADMIN],
  },
  {
    path: '/api/v1/users/*/change-password',
    method: 'PUT',
    roles: [Role.ADMIN],
  },
]
