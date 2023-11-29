import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
  console.log('Conectando a la base de datos')
  await mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err))
}
