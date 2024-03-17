/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/'

const START_SERVER = () => {
  const app = express()

  /**
   * Tại đây cho phép 1 middleware express json parse những dữ liệu Json ra
   * Enable req.body json data
   */
  app.use(express.json())

  // Sử dụng api /v1
  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hey ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  // Cleanup trước khi đóng server
  exitHook(() => {
    console.log('4. Disconnecting to MongoDB Cloud Atlas... ')
    CLOSE_DB()
    console.log('5. Disconnected to MongoDB Cloud Atlas... ')
  })
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
