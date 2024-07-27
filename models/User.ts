import { Model, Schema, model, models } from "mongoose";

interface IUserProfile {
  name: string,
  displayname: string,
  bio: string,
}

interface IUser {
  email: string;
  image: string;
  default: string;
  profile: IUserProfile;
  relationships: {
    followers: string[];
    following: string[];
    mutual: string[];
  },
  options: {
    isProfileSearchable: boolean;
    postDefaultStatus: string;
    blacklist: string[];
  }
}

export type UserModel = Model<IUser, {}>;

const UserSchema = new Schema<IUser, UserModel>(
  {
    email: { type: String, required: true, unique: true },
    image: { type: String, default: "/profile.png" },
    default: { type: String },
    profile: {
      name: { type: String },
      displayname: { type: String, unique: true },
      bio: { type: String }
    },
    relationships: {
      followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
      following: [{ type: Schema.Types.ObjectId, ref: "User" }],
      mutual: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    options: {
      isProfileSearchable: { type: Boolean, default: true },
      blacklist: [{ type: Schema.Types.ObjectId, ref: "User" }],
    }
  },
  { timestamps: true }
)

const User = models.User || model<IUser, UserModel>("User", UserSchema);

export default User;
