import mongoose, { Schema } from 'mongoose'

const MemoMeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    body: [{
        idx: String,
        media: {
            secure_url: String,
            public_id: String,
            public_url: String
        },
        content: String,
        time: {
            type: String,
            required: true
        }
    }]
})

export default mongoose.model("MemoMe", MemoMeSchema)