import mongoose from 'mongoose'
const autoIncrement = require('express-mongoose-sequence')(mongoose)

const userModel = new mongoose.Schema(
    {
        username: {
            sparse: true,
            require: true,
            unique: true,
        },
        password: {
            sparse: true,
            require: true,
            unique: true,
        },
        createdAt: String
    },
)

userModel.plugin(autoIncrement, {
    inc_field: 'user',
    id: 'userNums',
    start_req: 1
})

export default mongoose.model("usermodel", userModel)