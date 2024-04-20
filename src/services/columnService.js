/* eslint-disable no-useless-catch */
/**
 * BrianDev
 */
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

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

    // Config message response
    const successMessage = `Column "${getNewColumn.title}" has been Created successfully!`

    return { column: getNewColumn, message: successMessage }
  } catch (error) {
    throw error
  }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)

    return updatedColumn
  } catch (error) {
    throw error
  }
}

const deleteItem = async (columnId) => {
  try {
    // Lấy thông tin cột để có thể chèn tên vào thông báo
    const column = await columnModel.findOneById(columnId)

    if (!column) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found!')
    }

    // Xoá Column
    await columnModel.deleteOneById(columnId)

    // Xoá Cards thuộc Column trên
    await cardModel.deleteManyByColumnId(columnId)

    // Xoá columnId trong mảng columnOrderIds của Board chứa column đó
    await boardModel.pullColumnOrderIds(column)

    // return { deleteResult: 'Column and its Cards deleted successfully!' }
    const deleteResult = `Column "${column.title}" has been successfully Deleted!`

    return { deleteResult }
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}
