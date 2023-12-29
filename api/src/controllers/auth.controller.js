import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const testServer = async (req, res) => {
  res.status(200).json('Server running')
}

export const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const userFound = await User.findOne({ email })
    if (userFound) throw new Error('The email is already in use')

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      name,
      email,
      password: passwordHash
    })
    const userSaved = await newUser.save()
    const token = await createAccessToken({ id: userSaved._id })

    res.cookie('token', token, {
      maxAge: 86400000,
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })
    res.json({
      token,
      id: userSaved._id,
      name: userSaved.name,
      email: userSaved.email,
      createdAt: userSaved.createdAt
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const userFound = await User.findOne({ email })
    if (!userFound) throw new Error('Incorrect user')

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) throw new Error('Incorrect user')
    const token = await createAccessToken({ id: userFound._id })

    res.cookie('token', token, {
      maxAge: 86400000,
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })
    res.json({
      token,
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      createdAt: userFound.createdAt
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  res.cookie('token', '')
  res.status(200).send('Logout successfully')
}
export const verifyToken = (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' })

    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(401).json({ message: 'Unauthorized' })

    return res.json({
      token,
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      createdAt: userFound.createdAt
    })
  })
}

export const updateProfile = async (req, res) => {
  try {
    const id = req.params.id
    const { name, email } = req.body
    if (email) {
      const emailFound = await User.findOne({ email })
      if (emailFound) throw new Error('The email is already in use')
    }
    const userFound = await User.findByIdAndUpdate(id, { name, email })
    if (!userFound) return res.status(404).json({ message: 'User not found' })
    return res.status(200).json({ message: 'User updated successfull' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteProfile = async (req, res) => {
  try {
    const id = req.params.id
    const userFound = await User.findByIdAndDelete(id)
    if (!userFound) { return res.status(404).json({ message: 'The user could not be deleted' }) }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updatePassword = async (req, res) => {
  try {
    const id = req.params.id
    const currentPassword = req.body.currentPassword
    const userFound = await User.findById(id)

    const isMatch = await bcrypt.compare(currentPassword, userFound.password)
    if (!isMatch) return res.status(400).json({ message: 'The password is not correct' })

    const newPassword = req.body.newPassword
    const passwordHash = await bcrypt.hash(newPassword, 10)
    const newUser = await User.findByIdAndUpdate(id, { password: passwordHash })
    if (!newUser) return res.status(400).json({ message: 'Error updating the password' })
    return res.status(200).json({ message: 'Password updated successfull' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
