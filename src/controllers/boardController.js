/**
 * BrianDev
 */

import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    console.log('req.query', req.query)

    // Có kết quả thì trả về Client
    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: APIs created new Board.' })
  } catch (error) {
    console.log(error)
    // console.log(new Error(error))
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const boardController = {
  createNew
}
