import jwt from 'jsonwebtoken'

export const generateToken = ({ data, expiresIn = '10s' }) => {
  const secretKey = process.env.SECRET_KEY
  const token = jwt.sign(data, secretKey, {
    expiresIn
  })

  return token
}

export const verifyToken = (token) => {
  const secretKey = process.env.SECRET_KEY
  return jwt.verify(token, secretKey)
}
