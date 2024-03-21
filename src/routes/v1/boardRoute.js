/**
 * BrianDev
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET APIs board are ready to use.' })
  })
  .post(boardValidation.createNew, boardController.createNew)

// Get details board API
Router.route('/:id').get(boardController.getDetails).put(boardValidation.update, boardController.update)

// API hỗ trợ cho việc di chuyển giữa các Column khác nhau
Router.route('/supports/moving_card').put(
  boardValidation.moveCardToDifferentColumn,
  boardController.moveCardToDifferentColumn
)

export const boardRoute = Router
