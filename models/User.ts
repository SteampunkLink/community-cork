import { Model, Schema, model, models } from "mongoose";

interface IUserProfile {
  name: string,
  displayname: string,
  bio: string,
}

interface IUser {
  email: string;
  username: string;
  image: string;
  profile: IUserProfile;
  relationships: {
    followers: string[];
    following: string[];
    mutual: string[];
  }
}

export type UserModel = Model<IUser, {}>;

const UserSchema = new Schema<IUser, UserModel>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: "/profile.png" },
    profile: {
      name: { type: String },
      displayname: { type: String },
      bio: { type: String }
    },
    relationships: {
      followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
      following: [{ type: Schema.Types.ObjectId, ref: "User" }],
      mutual: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
)

const User = models.User || model<IUser, UserModel>("User", UserSchema);

export default User;

// export interface IUserWithId {
//   _id: string;
//   username: string;
//   email: string;
//   image: string;
//   profile: {
//     name?: string;
//     displayname?: string;
//     bio?: string;
//   }
//   relationships: {
//     followers: string[];
//     following: string[];
//     mutual: string[];
//   }
// }