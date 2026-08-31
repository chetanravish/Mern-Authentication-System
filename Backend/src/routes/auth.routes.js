import { Router } from "express";
import * as authController from "../controller/auth.controller.js"

const authRouter = Router();

authRouter.post("/register",authController.register)
authRouter.post("/login",authController.login)
authRouter.get("/getme",authController.getme)
authRouter.post("/refresh-token",authController.refreshToken)
authRouter.get("/logout",authController.logout)
authRouter.get("/logout-all",authController.logoutAll)
authRouter.post("/verify-email",authController.verifyEmail)
authRouter.post("/resend-otp",authController.resendOtp)
authRouter.post("/forgot-password",authController.forgotPassword)
authRouter.post("/verify-reset-otp",authController.verifyResetOtp)
authRouter.post("/reset-password",authController.resetPassword)
export default authRouter 