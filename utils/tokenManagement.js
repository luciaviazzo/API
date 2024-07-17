import jwt from 'jsonwebtoken'

export const generateToken = ({ data }) => {
  const secretKey = process.env.SECRET_KEY
  const token = jwt.sign(data, secretKey, {
    expiresIn : '7d'
  })

  return token
}

export const verifyToken = (token) => {
  const secretKey = process.env.SECRET_KEY
  return jwt.verify(token, secretKey)
}
