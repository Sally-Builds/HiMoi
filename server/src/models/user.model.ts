import { Schema, model } from 'mongoose'

export enum Gender {
    Male = "male",
    Female = "female"
}

export interface IUser {
    email: string;
    id: string;
    name: string;
    nick_name: string;
    dob: Date;
    gender: Gender;
    interests: string[];
    location: string;
    age: number;
    height: number;
}


const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, 'email is required']
    },
    name: String,
    nick_name: String,
    dob: Date,
    gender: {
        type: String,
        enum: Object.values(Gender)
    },
    interests: [String],
    age: Number,
    height: Number,
})

export const UserModel = model("User", userSchema)