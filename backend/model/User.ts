import mongoose from 'mongoose'
const autoIncrement = require('express-mongoose-sequence')(mongoose)

const userModel = new mongoose.Schema(
    {
        user: {
            sparse: true,
            require: true,
            unique: true,
        },
        mail: {
            email: {
                type: String,
                unique: true,
                sparse: true
            },
            isVerified: {
                type: Boolean,
                default: false
            }
        },
        password: {
            type: String,
            require: true
        },
        createdAt: String
    }
)

userModel.plugin(autoIncrement, {
    inc_field: 'user',
    id: 'userNums',
    start_req: 1
})

export default mongoose.model("User", userModel)