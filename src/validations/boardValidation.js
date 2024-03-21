/**
 * BrianDev
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    /**
     * abortEarly: trả về all error nếu có, thay vì chỉ lỗi đầu tiên gặp
     */
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    // Validate dữ liệu thành công , cho phép req move sang Controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

// Update Board (! Ko dùng required())
const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),

    columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
  })

  try {
    // Khi sử dụng Joi, trường hợp Update data sẽ cho phép Unknown
    await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

// Update Board [API] Các bước kéo thả Cards sang Column khác
const moveCardToDifferentColumn = async (req, res, next) => {
  const correctCondition = Joi.object({
    currentCardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    prevColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    prevCardOrderIds: Joi.array()
      .required()
      .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)),

    nextColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    nextCardOrderIds: Joi.array().required().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew,
  update,
  moveCardToDifferentColumn
}
