/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'

import { CONNECT_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { corsOptions } from '~/config/cors'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  /**
   * Tại đây cho phép 1 middleware express json parse những dữ liệu Json ra
   * Enable req.body json data
   */
  app.use(express.json())

  // Sử dụng api /v1
  app.use('/v1', APIs_V1)

  // Middlewares xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  // Production
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`3. Production: Hey ${env.AUTHOR}, I am running at ${process.env.PORT}/`)
    })
  } else {
    // Develop
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(
        `3. DEV: Hey ${env.AUTHOR}, I am running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`
      )
    })
  }
}

;(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas... ')
    await CONNECT_DB()
    console.log('2. Connected to mongoDB Atlas')

    // Khởi động server
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()

// console.log('Connecting to MongoDB Cloud Atlas... ')
// CONNECT_DB()
//   .then(() => console.log('Connected to mongoDB Atlas'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.log(error)
//     process.exit(0)
//   })
