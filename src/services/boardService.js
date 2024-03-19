/* eslint-disable no-useless-catch */
/**
 * BrianDev
 */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

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

export const boardService = {
  createNew
}
