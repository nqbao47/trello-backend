/**
 * BrianDev
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
const Router = express.Router()
import { boardRoute } from './boardRoute'
import { columnRoute } from './columnRoute'
import { cardRoute } from './cardRoute'

/** Check APIs v1 status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

/** Board API */
Router.use('/boards', boardRoute)

/** Columns API */
Router.use('/columns', columnRoute)

/** Card API */
Router.use('/cards', cardRoute)

export const APIs_V1 = Router
