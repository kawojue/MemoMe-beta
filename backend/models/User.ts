import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
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
            required: true
        },
        token: String,
        lastLogin: String,
        lastLogout: String
    },
    {
        timestamps: true
    }
)

export default mongoose.model("User", userSchema)