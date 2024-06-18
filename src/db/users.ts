import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' }, // 性別
    birthdate: { type: Date }, // 出生年月日
    phone: { type: String }, // 電話
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    accessToken: { type: String, require: true },
    refreshToken: { type: String, require: true }
}, { collection: 'users' });

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, { new: true });
