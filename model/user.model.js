const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// generateToken
userSchema.methods.generateJwt = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id, email: this.email },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
const User = mongoose.model("User", userSchema);
module.exports = User;
