import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        first: String,
        last: String,
        email: String,
        username: String, // I'm not going to make this editable for now
        date: String,
        password: String,
        school: {type: String, required: false},
        campus: {type: String, required: false},
        company: {type: String, required: false},
        portrait: {type: String, required: false}, // incoming...
    }, { collection: "user" }
)

export default mongoose.models.User || mongoose.model("User", UserSchema);