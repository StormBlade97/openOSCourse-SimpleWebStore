import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  name: String,
  price: Number,
  image: String,
  stock: Number
})

schema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.__v
    ret.id = ret._id.toString()
    delete ret._id
  }
})
const Item = mongoose.model('Item', schema)

export default Item
