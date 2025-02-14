import { desc } from "drizzle-orm";
import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    description: string;
    image: string;
}

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    username: {
        require: true,
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        required: true,
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        required: true,
        type: String,
        trim: true,
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        trim: true,
    }
})

const User = model<IUser>('User', userSchema);
export default User;


