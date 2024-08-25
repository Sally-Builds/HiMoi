import { Schema, model } from 'mongoose'

export enum Gender {
    Male = "male",
    Female = "female"
}

export interface IUser {
    email: string;
    password: string;
    id: string;
    full_name: string;
    nick_name: string;
    dob: Date;
    gender: Gender;
    interests: string[];
    location: string;
    height: string;
    is_verified: boolean;
}


const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    full_name: String,
    nick_name: String,
    dob: Date,
    gender: {
        type: String,
        enum: Object.values(Gender)
    },
    interests: [String],
    height: String,
    is_verified: {
        type: Boolean,
        default: false,
    }
})

export const UserModel = model("User", userSchema)