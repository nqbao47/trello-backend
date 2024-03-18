/* eslint-disable no-useless-catch */
/**
 * BrianDev
 */
import { slugify } from '~/utils/formatters'

const createNew = async (data) => {
  try {
    //Xử lý dữ liệu tuỳ đặc thù dự án
    const newBoard = {
      ...data,
      slug: slugify(data.title)
    }

    // Gọi tới tầng model để xử lý bản ghi newBoard vào trong db
    // Làm thêm các xử lý khác với các collections khác..v.v..
    // Bắn email, notification về cho admin khi có user tạo ra 1 board mới..v.v..

    // Trả kết quả về
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}
