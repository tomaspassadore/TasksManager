import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateTask: {
    type: String,
    required: true
  },
  timeTask: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    date: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true }
)
export default mongoose.model('Task', taskSchema)
