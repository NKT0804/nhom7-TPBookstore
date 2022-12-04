import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            default: ""
        },
        password: {
            type: String,
            required: true
        },
        avatarUrl: {
            type: String,
            default: "./images/avatar/default.png"
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        sex: {
            type: String,
            default: ""
        },
        birthday: {
            type: String,
            default: ""
        },
        address: {
            province: {
                type: String,
                default: ""
            },
            district: {
                type: String,
                default: ""
            },
            ward: {
                type: String,
                default: ""
            },
            specificAddress: {
                type: String,
                default: ""
            }
        },
        isVerified: {
            type: Boolean,
            required: false,
            default: false
        },
        emailVerificationToken: {
            type: String,
            required: false
        },
        resetPasswordToken: {
            type: String,
            required: false
        },
        resetPasswordTokenExpiryTime: {
            type: Number,
            required: false
        },
        isDisabled: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
);

//Login handle method
userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

// Register handle method
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
