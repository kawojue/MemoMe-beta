import mongoose, { Schema } from 'mongoose'

const MemoMeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    body: [{
        idx: String,
        image: {
            sucure_url: String,
            public_id: String
        },
        content: String,
        time: {
            type: String,
            required: true
        }
    }]
})

export default mongoose.model("MemoMe", MemoMeSchema)