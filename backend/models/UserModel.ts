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
            verified: {
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
        },
        disabled: {
            type: Boolean,
            default: false
        },
        pbContent: {
            type: Boolean,
            default: true
        },
        pbMedia: {
            type: Boolean,
            default: true
        },
        pbMsg: {
            type: String,
            default: "Tell me what is on your mind?"
        }
    }
)

export default mongoose.model("User", userSchema)