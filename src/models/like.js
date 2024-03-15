import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
        uuid: String,
        author: String,
        by: String,
        date: Date,
        extra: {type: Object, required: false}
    }, {collection: "like"}
)

export default mongoose.models.Like || mongoose.model("Like", LikeSchema);