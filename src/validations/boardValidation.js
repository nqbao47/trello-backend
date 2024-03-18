/**
 * BrianDev
 */
import Joi, { assert } from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    /**
     * abortEarly: trả về all error nếu có thay vì chỉ lỗi đầu tiên gặp
     */
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    // Validate dữ liệu thành công , cho phép req move sang Controller
    next()
  } catch (error) {
    console.log(error)
    // console.log(new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}
