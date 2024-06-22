/**
 * BrianDev
 */
// briandev
// ExzdT6QWazS4GWF7
import { env } from '~/config/environment'

const { MongoClient, ServerApiVersion } = require('mongodb')

// Khởi tạo đối tượng trelloDatabaseInstance ban đầu là null (vì chưa connect)
let trelloDatabaseInstance = null

// Khởi tạo đối tượng mongoClientInstance để kết nối đến MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Chỉ khi Kết nối tới Database thành công thì mới Start server
export const CONNECT_DB = async () => {
  // Call kết nối tới mongoDB atlas với URL đã khai báo trong thân mongoClientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công, thì lấy ra database theo tên và gán ngược nó lại vào biến
  // trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

/**
 * Export ra trelloDatabaseInstance sau khi đã connect thành công tới MongoDB để chúng ta sử dụng
 * ở nhiều nơi khác
 * (!) chỉ gọi GET_DB sau khi đã kết nối Db thành công
 * (!) ko async
 */
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}

// Đóng kết nối tới Database
export const CLOSE_DB = async () => {
  // console.log('CLOSE_BD Function... ')

  await mongoClientInstance.close()
}
