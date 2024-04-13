import { Router, Request, Response, NextFunction } from 'express'
import { UserController } from '../controller/userController'

export const userRouter = Router()

userRouter.delete('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  await UserController.deleteUser(userId)
  res.status(200).end()
})

userRouter.put('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  const editData = {
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
  }

  await UserController.editUser(userId, editData)
  res.status(200).end()
})

userRouter.put(
  '/:userId/change-password',
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    const newPassword = req.body.password
    await UserController.changePassword(userId, newPassword)
    res.status(200).end()
  },
)
