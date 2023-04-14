import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
    {
        user: {
            type: String,
            require: true,
            unique: true,
            sparse: true,
        },
        mail: {
            email: {
                type: String,
                unique: true,
                sparse: true,
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

export default mongoose.model("User", userSchema)