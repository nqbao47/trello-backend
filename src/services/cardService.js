/* eslint-disable no-useless-catch */
/**
 * BrianDev
 */
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }

    const createdColumn = await cardModel.createNew(newCard)

    const getNewCard = await cardModel.findOneById(createdColumn.insertedId)

    // Link dữ liệu giữa các Collections
    if (getNewCard) {
      // Update lại mảng CardOrderIds trong Collection column
      await columnModel.pushCardOrderIds(getNewCard)
    }

    // Config message response
    const successMessage = `Card "${getNewCard.title}" has been Created successfully!`

    return { card: getNewCard, message: successMessage }
  } catch (error) {
    throw error
  }
}

const search = async (searchQuery) => {
  try {
    // Sử dụng logic tìm kiếm phù hợp với ứng dụng của bạn
    // Ví dụ: Tìm các card có tên chứa searchQuery
    const searchResults = await cardModel.find({ title: { $regex: searchQuery, $options: 'i' } })
    return searchResults
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew,
  search
}
