/* eslint-disable no-useless-catch */
/**
 * BrianDev
 */
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModel.createNew(newColumn)

    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    // Link dữ liệu giữa các Collections
    if (getNewColumn) {
      // Xử lý data ở đây trước khi trả về Fe nếu FE cần cấu trúc có sẵn Cards lồng bên trong Columns
      getNewColumn.cards = []

      // Update lại mảng columnOrderIds trong Collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew
}
