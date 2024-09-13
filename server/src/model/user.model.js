import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      reuqired: true,
    },
    password: {
      type: String,
      reuqired: true,
    },
    pastScore: {
type:Number
    },
    highestScore: {
      type: Number,
    },
    userRefreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified(password)) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.passCheck = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "10d",
    }
  );
};

userSchema.methods.genAccessToken = async function () {
  return (
    jwt.sign({
      _id: this._id,
      email: this.email,
    }),
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "10d",
    }
  );
};
export const User = mongoose.model("User",userSchema)