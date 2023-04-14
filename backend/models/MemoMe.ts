import mongoose from "mongoose"
const autoIncrement = require('mongoose-sequence')(mongoose)

const memoMeModel = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    content: String,
    image: String,
    time: String,
})

memoMeModel.plugin(autoIncrement, {
    inc_field: "memome",
    id: "memos",
    start_req: 1
})

export default mongoose.model("memome", memoMeModel)