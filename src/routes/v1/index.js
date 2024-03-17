/**
 * BrianDev
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
const Router = express.Router()
import { boardRoute } from './boardRoute'

/** Check APIs v1 status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

/** Only about boardRoute */
Router.use('/boards', boardRoute)

export const APIs_V1 = Router
