import { NextFunction, Request, Response, Router } from "express";
import { getAccessTokenFromAuthCode } from "@/services/AuthService";
import container from "@/container/inversify.config";
import TYPES from "@/config/types";
import { AppError } from "@/ErrorHandler/AppError";
import { CustomResponse } from "@/ErrorHandler/CustomResponse";
import { checkUser } from "@/middleware/checkUser";

const jwt = require("jsonwebtoken");

export default () => {
  const router = Router();

  // router.post("/login", Login);

  router.post(
    "/authorize",
    async (req: Request, res: Response, next: NextFunction) => {
      const { userCode, email } = req.body;

      if (!userCode || !email) {
        const err = new AppError("userCode and email is required", 400);
        return next(err);
      }

      try {
        const { user, token } = await getAccessTokenFromAuthCode({
          userCode,
          email,
        });

        const {
          refreshToken,
          userCode: code,
          confirmationCode,
          __v,
          ...rest
        } = user;

        // set cookie
        const cookie = signCookie({ user, token }, token.expiresIn);

        res.cookie("token", cookie, {
          httpOnly: true,
          domain: process.env.DOMAIN,
          maxAge: token.expiresIn,
        });

        res.send(rest);
      } catch (e) {
        return next(e);
      }
    }
  );

  router.get("/whoami", checkUser, async (req, res, next) => {
    res.send(res.locals?.user?.user);
  });

  router.post("/logout", async (req, res, next) => {
    res.locals.user = null;
    res.locals.token = null;

    res.status(200).clearCookie("token", {
      httpOnly: true,
    });

    res.send(CustomResponse("User logged out successfully..", 200));
  });

  // router.post("/verify", async (req, res, next) => {
  //   const { token } = req.body;

  //   if (!token) {
  //     const err = new AppError("token is missing in reques body", 400);
  //     return next(err);
  //   }

  //   try {
  //     const userEmail = await OTPService.verify(token);

  //     const done = await completeRegistration(userEmail);

  // res.send(CustomResponse("Account Email verification Successful",201))

  //   } catch (e) {
  //     return next(e);
  //   }
  // });

  return router;
};

const signCookie = (id, maxAge) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};
