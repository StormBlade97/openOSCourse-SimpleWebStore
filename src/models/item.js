import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: String,
    stock: { Number, default: 0 }
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
