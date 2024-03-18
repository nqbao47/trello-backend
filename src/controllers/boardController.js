/**
 * BrianDev
 */
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body', req.body)

    // throw new Error('Test error')
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Briandev: Test error')
    // Có kết quả thì trả về Client
    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: APIs created new Board.' })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}
