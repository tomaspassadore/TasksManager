import jwt from 'jsonwebtoken'
import 'dotenv/config'
// import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ message: 'No token. Authorization deniedd' })
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })
    req.user = decoded
    next()
  })
}
