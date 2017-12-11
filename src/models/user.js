import mongoose, { Schema, SchemaTypes } from 'mongoose'

const schema = new Schema({
  username: String,
  password: String,
  privilege: {
    type: String,
    enum: ['admin', 'staff', 'customer']
  },
  transactions: [
    {
      items: [{ item_id: SchemaTypes.ObjectId, quantity: Number }]
    }
  ]
})
schema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.__v
    ret.id = ret._id.toString()
    delete ret._id
  }
})
const User = mongoose.model('User', schema)

export default User
