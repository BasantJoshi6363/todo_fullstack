import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["user", "superadmin"],
            default: "user",
        },
        contactNumber: {
            type: Number,

        },
        position: {
            type: String,
        },
        profilePicture: {
            type: String,
            default: "https://res.cloudinary.com/dygejaq0z/image/upload/v1781018027/newsportal/iurki6qmsariznvqgnnw.png"
        },

        refreshToken: {
            type: String,
        },
        todos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Todo",
                required: true
            }
        ]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;