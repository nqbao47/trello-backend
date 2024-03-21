/**
 * BrianDev
 */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  try {
    //Xử lý dữ liệu tuỳ đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng model để xử lý bản ghi newBoard vào trong db
    const createdBoard = await boardModel.createNew(newBoard)

    // Lấy bảng ghi Board sau khi gọi (sau khi post để tạo thì sẽ trả về đúng dữ liệu bảng)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId.toString())

    // Làm thêm các xử lý khác với các collections khác..v.v..
    // Bắn email, notification về cho admin khi có user tạo ra 1 board mới..v.v..

    // Trả kết quả về
    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'BOARD NOT FOUND')
    }

    // Thêm mảng Card vào Column
    // B1: Sử dụng cloneDeep để ko làm ảnh hưởng đến board ban đầu
    const resBoard = cloneDeep(board)

    // B2: Đưa card về đúng Column của chính nó
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter((card) => card.columnId.equals(column._id)) // Dùng toString() để so sánh
      // column.cards = resBoard.cards.filter((card) => card.columnId.toString() === column._id.toString()) // Dùng toString() để so sánh
    })

    // B3: Sau khi đổ thành công cards vào column thì xoá nó đi
    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)

    return updatedBoard
  } catch (error) {
    throw error
  }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    // [API] Các bước kéo thả Cards sang Column khác
    // B1: Update mảng cardOrderIds của Column ban đầu chứa nó (Xoá _id của Card ra khỏi mảng)
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updateAt: Date.now()
    })

    // B2: Update mảng cardOrderIds của Column tiếp theo (Thêm _id của Card vào mảng)
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updateAt: Date.now()
    })

    // B3: Update lại  trường columnId mới của cái Card đã kéo
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })

    return { updatedResult: 'Success' }
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
