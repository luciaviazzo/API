import HTTP_STATUS from '../helpers/httpStatus.js'
import { generateToken, verifyToken } from '../utils/tokenManagement.js'
import { encrypt, verified } from '../utils/bcrypt.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const userController = () => {

  // Registra un usuario
  const register = async (request, response, next) => {
    const newUser = request.body
    const hashedPassword = await encrypt(newUser.password) // Encripta la contraseña
    newUser.password = hashedPassword

    try {
      const createdUser = await prisma.user.create({
        data: newUser
      })

      const responseFormat = {
        data: createdUser,
        message: 'User created successfully'
      }

      return response.status(HTTP_STATUS.CREATED).json(responseFormat)

    } catch (error) {
      next(error)

    } finally {
      await prisma.$disconnect()
    }
  }

  // Maneja el inicio de sesion de un usuario
  const login = async (request, response, next) => {
    const { email, password } = request.body

    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!user) {
        return response.status(HTTP_STATUS.NOT_FOUND).json({
          message: 'Invalid credentials'
        })
      }

      const isPasswordValid = await verified(password, user.password) // Compara que las constraseñas

      if (!isPasswordValid) {
        return response.status(HTTP_STATUS.UNAUTHORIZED).json({
          message: 'Invalid credentials'
        })
      }

      // Genera el token y el refresh token 
      const token = generateToken({
        data:
          { email, role: user.role }
      })

      const refreshToken = generateToken({
        data:
          { email, role: user.role },
        isRefresh: true,
        expiresIn: '7d'
      })

      return response.status(HTTP_STATUS.OK).json({
        message: 'Login successful',
        token,
        refreshToken
      })

    } catch (error) {
      next(error)

    } finally {
      await prisma.$disconnect()
    }
  }

  // Maneja la generacion de un nuevo token 
  const refreshToken = async (request, response, next) => {
    const { refreshToken } = request.body

    try {
      const { role, email } = verifyToken(refreshToken, true)
      const token = generateToken({
        data: { email, role, message: 'new token' }
      })

      return response.status(HTTP_STATUS.OK).json({
        success: true,
        token
      })

    } catch (error) {
      next(error)
    }
  }

  // Devuelve un usuario a partir de su ID 
  const getUserById = async (request, response, next) => {
    const { id } = request.params
    const userId = Number(id)

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      return response.status(HTTP_STATUS.OK).json({
        data: user
      })

    } catch (error) {
      next(error)

    } finally {
      await prisma.$disconnect()
    }
  }


  return {
    register,
    login,
    getUserById,
    refreshToken
  }
}