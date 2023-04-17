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
        createdAt: String,
        lastLogout: String,
        profileViews: {
            type: Number,
            default: 0
        },
        body: {
            type: Boolean,
            default: false
        },
        OTP: {
            totp: String,
            totpDate: Number
        }
    }
)

export default mongoose.model("User", userSchema)