import { ApiError } from "../utlis/ApiError.js";
import { ApiRes } from "../utlis/ApiRes.js";
import { User } from "../model/user.model.js";
const genAccessTokenandRefreshToken = async (userId) => {
  try {
    const existedUser = await User.findById(userId);
    const userAccessToken = existedUser.genAccessToken();
    const userRefreshToken = existedUser.genRefreshToken();

    existedUser.userRefreshToken = userRefreshToken;
    await existedUser.save({
      validateBeforeSave: false,
    });
    return { userAccessToken, userRefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating tokens",
      error
    );
  }
};
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(404)
      .json(new ApiError(404, "Email and Password are mandatory"));

  const exisitingUser = await User.findOne({
    email,
  });
  if (exisitingUser)
    return res.status(400).json(new ApiRes(400, email, "Email Already Exists"));

  const createdUser = await User.create({
    email: email.toLowerCase(),
    password,
    pastScore:0,
    highestScore: 0,
  });
  const savedUser = await User.findById(createdUser._id).select(
    "-password -userRefreshToken"
  );
  if (!savedUser)
    return res.status(500).json(new ApiError(500, "Something went wrong"));
  return res
    .status(200)
    .json(new ApiRes(200, email, `Email Registration Successful`));
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(404)
      .json(new ApiError(404, "Email and Password are mandatory"));

  const exisitingUser = await User.findOne({
    email,
  });
  if (!exisitingUser)
    return res.status(400).json(new ApiRes(400, email, "Email Doesn't Exists"));
  const passValid = await exisitingUser.passCheck(password);
  if (!passValid)
    return res.status(401).json(new ApiError(404, "Password is wrong!!"));

  const { userAccessToken, userRefreshToken } =
    await genAccessTokenandRefreshToken(existedUser._id);
  const loggedInUser = await User.findById(existedUser._id).select(
    "-password -userRefreshToken"
  );
  return res
    .status(200)
    .cookie("userAccessToken", userAccessToken) // add when checking locally with postman - it behaves the same for auth like we have in client side
    .json(
      new ApiRes(
        200,
        {
          user: loggedInUser,
          userAccessToken,
          userRefreshToken,
          // currentLvlScore,
        },
        "User logged in successfully"
      )
    );
};

export { registerUser,loginUser };
