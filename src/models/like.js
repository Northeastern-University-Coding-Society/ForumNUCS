import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
        uuid: String,
        author: String,
        by: String,
        date: Date
    }, {collection: "like"}
)

export default mongoose.models.Like || mongoose.model("Like", LikeSchema);