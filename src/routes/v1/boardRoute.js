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

export const boardRoute = Router
