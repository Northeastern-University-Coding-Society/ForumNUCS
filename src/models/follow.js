import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema({
        follower: String,
        followee: String,
        name: String,
        date: Date
    }, {collection: "follow"}
)

export default mongoose.models.Follow || mongoose.model("Follow", FollowSchema);