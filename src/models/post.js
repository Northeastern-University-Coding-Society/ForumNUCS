import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
        author: String, // user name
        authorId: String, // username
        uuid: String,
        title: String,
        content: String,
        date: String,
        tags: {type: [String], required: false}
    }, {collection: "post"}
)

export default mongoose.models.Post || mongoose.model("Post", PostSchema);