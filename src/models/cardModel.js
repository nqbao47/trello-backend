import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

// Chỉ định ra các Fields mà ko muốn cho phép update trong hàm update
const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createAt']

const validateDataBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateDataBeforeCreate(data)
    // Biến đổi boardId, columnId từ String thành ObjectId khi truyền vào database
    const newCardToAdd = {
      ...validData,
      boardId: new ObjectId(validData.boardId),
      columnId: new ObjectId(validData.columnId)
    }
    return await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(newCardToAdd)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (cardId) => {
  try {
    const result = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(cardId)
      })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

// Push 1 giá trị columnId vào cuối mảng columOrderIds
const update = async (cardId, updateData) => {
  try {
    // Filter các fields mà chúng ta ko cho phép update lung tung
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName]
      }
    })

    // Đối với các data liên quan đến ObjectId thì phải biến đổi ở đây
    if (updateData.columnId) updateData.columnId = new ObjectId(updateData.columnId)

    const result = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .findOneAndUpdate({ _id: new ObjectId(cardId) }, { $set: updateData }, { returnDocument: 'after' }) // trả về kết quả mới sau khi update
    return result
  } catch (error) {
    throw new Error(error)
  }
}

// Xoá Cards trong Column
const deleteManyByColumnId = async (columnId) => {
  try {
    const result = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .deleteMany({
        columnId: new ObjectId(columnId)
      })
    // console.log('🚀 ~ deleteManyByColumnId ~ result:', result)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  update,
  deleteManyByColumnId
}
