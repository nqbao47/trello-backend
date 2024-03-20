/* eslint-disable no-useless-catch */
/**
 * BrianDev
 */
import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }

    const createdColumn = await cardModel.createNew(newCard)

    const getCard = await cardModel.findOneById(createdColumn.insertedId)

    // ...

    return getCard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}
