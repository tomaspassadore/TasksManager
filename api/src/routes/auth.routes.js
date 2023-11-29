import { Router } from 'express'
import {
  register,
  login,
  logout,
  verifyToken,
  updateProfile,
  deleteProfile,
  updatePassword
} from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema, updateNameSchema, updateEmailSchema, updatePasswordSchema } from '../schemas/auth.schema.js'

const router = Router()

// Routes
router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/verify', verifyToken)
router.put('/profile/update/name/:id', authRequired, validateSchema(updateNameSchema), updateProfile)
router.put('/profile/update/email/:id', authRequired, validateSchema(updateEmailSchema), updateProfile)
router.put('/profile/update/password/:id', validateSchema(updatePasswordSchema), updatePassword)
router.delete('/profile/delete/:id', authRequired, deleteProfile)

export default router
