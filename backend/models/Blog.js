import mongoose from "mongoose";

let BlogSchema = new mongoose.Schema({
    title: String,
    poster: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Blog", BlogSchema);