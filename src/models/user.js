import mongoose, { Schema, SchemaTypes } from 'mongoose'

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    privilege: {
        type: String,
        default: 'customer',
        enum: ['admin', 'staff', 'customer']
    },
    transactions: [
        {
            items: [{ item_id: SchemaTypes.ObjectId, quantity: Number }]
        }
    ],
    avatar: String,
    balance: {
        type: Number,
        default: 0
    }
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
