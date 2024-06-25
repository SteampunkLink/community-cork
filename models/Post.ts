import { Model, Schema, model, models } from "mongoose";

interface IPost {
  user: Schema.Types.ObjectId;
  body: string;
  color: string;
  likes: Schema.Types.ObjectId[];
  status: string; // pinned or archive
}

export type PostModel = Model<IPost, {}>;

const PostSchema = new Schema<IPost, PostModel>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    body: { type: String, required: true },
    color: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, default: "pinned" },
  },
  { timestamps: true }
)

const Post = models.Post || model<IPost, PostModel>("Post", PostSchema);

export default Post;

// export interface IPostWithId {
//   _id: string;
//   user: string;
//   body: string;
//   color: string;
//   likes: string[];
//   status: string;
//   createdAt: string;
// }