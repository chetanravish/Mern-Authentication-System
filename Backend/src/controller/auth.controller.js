import userModel from "../models/user.model.js";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";
import { sendEmail } from "../services/email.service.js";
import { generateOtp, getOtpHtml } from "../utils/utils.js";
import familyModel from "../models/family.model.js";
import otpModel from "../models/otp.model.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { username, email, password } = req.body;
  const alreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (alreadyRegistered) {
    return res.status(409).json({
      message: "Username or email already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  await familyModel.create({
    owner: user._id,
    name: user.username,
    relation: "Self",
    isOwner: true,
  });

  const otp = generateOtp();
  const html = getOtpHtml(otp, email, username);
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  await otpModel.create({
    email,
    user: user._id,
    otpHash,
  });

  await sendEmail(email, "OTP Verification", `Your OTP Code Is ${otp}`, html);

  res.status(201).json({
    message: "User Created Successfully",
    user: {
      username: user.username,
      email: user.email,
      verified: user.verified,
    },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "invalid email or password ",
    });
  }

  if (!user.verified) {
    return res.status(403).json({
      message: "Email not verified",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "invalid email or password ",
    });
  }

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "Logged In Successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
}

export async function getme(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "token not found",
    });
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
  const user = await userModel.findById(decoded.id);

  res.status(200).json({
    message: "user fetched successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

export async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "refresh token not found plzz",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });

  if (!session) {
    return res.status(401).json({
      message: "invalid refresh token",
    });
  }

  const user = await userModel.findById(decoded.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const accessToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  const newrefreshToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const newRefreshTokenHash = crypto
    .createHash("sha256")
    .update(newrefreshToken)
    .digest("hex");
  session.refreshTokenHash = newRefreshTokenHash;
  await session.save();

  res.cookie("refreshToken", newrefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "access token refreshed",
    accessToken,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token not found",
    });
  }

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });

  if (!session) {
    return res.status(400).json({
      message: "Invalid refresh token",
    });
  }

  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "Logged Out Successfully",
  });
}

export async function logoutAll(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh Token not found",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  await sessionModel.updateMany(
    {
      user: decoded.id,
      revoked: false,
    },
    {
      revoked: true,
    },
  );

  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Logged out from all devices successfully",
  });
}

export async function verifyEmail(req, res) {
  const { otp, email } = req.body;

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const otpDoc = await otpModel.findOne({
    email,
    otpHash,
  });

  if (!otpDoc) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  const OTP_EXPIRY_MS = 10 * 60 * 1000;
  const elapsed = Date.now() - otpDoc.createdAt.getTime();

  if (elapsed > OTP_EXPIRY_MS) {
    await otpModel.deleteOne({ _id: otpDoc._id });
    return res.status(400).json({
      message: "OTP expired, please request a new one",
    });
  }

  const user = await userModel.findByIdAndUpdate(otpDoc.user, {
    verified: true,
  });

  await otpModel.deleteMany({
    user: otpDoc.user,
  });

  return res.status(200).json({
    message: "Email verified successfully",
    user: {
      username: user.username,
      email: user.email,
      verified: user.verified,
    },
  });
}

export async function resendOtp(req, res) {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found ",
    });
  }

  if (user.verified) {
    return res.status(400).json({
      message: "Email already verified",
    });
  }

  await otpModel.deleteMany({ email });
  const otp = generateOtp();
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  await otpModel.create({
    email,
    user: user._id,
    otpHash,
  });

  const html = getOtpHtml(otp, email, user.username);

  await sendEmail(email, "New OTP Verification", `Your OTP is ${otp}`, html);
  res.status(200).json({
    message: "OTP sent successfully",
  });
}

export async function forgotPassword(req, res) {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found !",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "Please verify your email first",
    });
  }

  await otpModel.deleteMany({ email });
  const otp = generateOtp();
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  await otpModel.create({
    email,
    user: user._id,
    otpHash,
  });

  const html = getOtpHtml(otp, email, user.username);

  await sendEmail(
    email,
    "OTP To Reset Your Password",
    `Your OTP is ${otp}`,
    html,
  );
  return res.status(200).json({
    message: "OTP sent successfully",
  });
}

export async function verifyResetOtp(req, res) {
  const { otp, email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found !",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "User not verified ! Please Verify User First",
    });
  }

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const otpDoc = await otpModel.findOne({
    email,
    otpHash,
  });

  if (!otpDoc) {
    return res.status(400).json({
      message: "Invalid or expired OTP",
    });
  }

  const resetToken = jwt.sign(
    {
      id: user._id,
      purpose: "password-reset",
    },
    config.JWT_SECRET,
    { expiresIn: "10m" },
  );

  await otpModel.deleteOne({ _id: otpDoc._id });

  return res.status(200).json({
    message: "OTP verified successfully",
    resetToken,
  });
}

export async function resetPassword(req, res) {
  const { newPassword } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Reset token missing" });
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);

  if (decoded.purpose !== "password-reset") {
    return res.status(401).json({ message: "Invalid token" });
  }

  const user = await userModel.findById(decoded.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found !",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "User is not verified ",
    });
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10);
  user.password = newPasswordHash;
  await user.save();

  await sessionModel.updateMany(
    { user: user._id, revoked: false },
    { revoked: true },
  );

  return res.status(200).json({
    message: "Password reset successfully",
  });
}
