/**
 * BrianDev
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
const Router = express.Router()
import { boardRoutes } from './boardRoutes'

/** Check APIs v1 status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

/** Only about boardRoutes */
Router.use('/boards', boardRoutes)

export const APIs_V1 = Router
