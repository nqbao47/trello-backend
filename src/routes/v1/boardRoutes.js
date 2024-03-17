/**
 * BrianDev
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET APIs board are ready to use.' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'POST APIs created new Board.' })
  })

export const boardRoutes = Router
