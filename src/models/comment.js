import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
        uuid: String,
        from: String,
        to: String,
        parent: String, // if not exist, make it ''
        date: Date,
        extra: {type: Object, required: false}
    }, {collection: "comment"}
)

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);