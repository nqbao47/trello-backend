/**
 * BrianDev
 */
import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'

const Router = express.Router()

Router.route('/').post(cardValidation.createNew, cardController.createNew)

// Search items
Router.get('/search', cardController.search)

export const cardRoute = Router
