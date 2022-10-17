import mongoose from "mongoose";
const { model, Schema } = mongoose;
const UserSchema = new Schema({
    nickName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userInfo: {
        firstName: String,
        lastName: String,
        avatar: String
    }
});
const User = model("User", UserSchema);
export default User;
