import mongoose from "mongoose";

const SaveSchema = new mongoose.Schema({
        uuid: String,
        author: String,
        by: String,
        date: Date,
        extra: {type: Object, required: false}
    }, {collection: "save"}
)

export default mongoose.models.Save || mongoose.model("Save", SaveSchema);