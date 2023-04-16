import mongoose, { Schema } from 'mongoose'

const MemoMeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    body: [{
        idx: String,
        image: String,
        content: String
    }]
})

export default mongoose.model("MemoMe", MemoMeSchema)