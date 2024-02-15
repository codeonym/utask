import mongoose from 'mongoose'

let isConnected = false // track the connection


export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log("mongodb already connected")
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DBNAME,
    })

    isConnected = true
    console.log("mongodb already connected")

  } catch (e) {
    console.log(`error: ${e}`)
  }

}
