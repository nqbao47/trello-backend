/**
 * BrianDev
 */
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const createdBoard = await boardService.createNew(req.body)

    // Có kết quả thì trả về Client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const Board = await boardService.getDetails(boardId)
    res.status(StatusCodes.OK).json(Board)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetails
}
