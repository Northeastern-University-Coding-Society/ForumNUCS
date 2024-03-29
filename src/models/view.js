import mongoose from "mongoose";

const ViewSchema = new mongoose.Schema({
        uuid: String,
        author: String,
        by: String,
        date: Date,
        extra: {type: Object, required: false}
    }, {collection: "view"}
)

export default mongoose.models.View || mongoose.model("View", ViewSchema);