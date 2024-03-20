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

    return getNewCard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}
