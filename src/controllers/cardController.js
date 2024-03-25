/**
 * BrianDev
 */
import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const createdCard = await cardService.createNew(req.body)

    // Có kết quả thì trả về Client
    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    next(error)
  }
}

const search = async (req, res, next) => {
  try {
    const { query } = req.query
    // Gọi service để xử lý tìm kiếm card
    const searchResults = await cardService.search(query)
    res.status(StatusCodes.OK).json(searchResults)
  } catch (error) {
    next(error)
  }
}

export const cardController = {
  createNew,
  search
}
