import Account from "../entity/Account";
import { Request, Response, NextFunction } from "express";
import { generateAccessToken } from "../middleware/auth";
import { AppError } from "@/ErrorHandler/AppError";
import { Redis } from "ioredis";
import container from "@/container/inversify.config";
import TYPES from "@/config/types";
import { UserService, UserServiceImpl } from "./UserService";
import { CustomResponse } from "@/ErrorHandler/CustomResponse";
import HttpClient from "./HttpClient";
import Axios, { AxiosInstance, AxiosResponse } from "axios";

const RequestHandler = Axios.create({
  baseURL: process.env.SSO_BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export const getAccessTokenFromAuthCode = async ({
  userCode: code,
  email,
}): Promise<authResponse> => {
  try {
    const { token, user } = await RequestHandler.post<authResponse>(
      "/auth/authorize",
      { code, email }
    ).then(({ data }) => data);

    //Todo
    //add all free products to user subscription

    await Account.findOneAndUpdate(
      { userId: user.id },
      { userId: user.id },
      { upsert: true }
    );

    return { token, user };
  } catch (e) {
    throw new AppError("Error getting Access token", 401);
  }
};

export const getAccessTokenInfo = async (access_token): Promise<string> => {
  const restClient = new HttpClient(access_token);
  try {
    return restClient.get("/info?api_version=1.0.0");
  } catch (e) {
    throw new AppError("Error getting Access token", 400);
  }
};

interface authResponse {
  user: ssoUser;
  token: access_token;
}

interface ssoUser {
  status: string;
  _id: string;
  __v: string;
  firstName: string;
  lastName: string;
  email: string;
  userCode: string;
  confirmationCode: string;
  refreshToken: string;
  fullName: string;
  id: string;
}

interface access_token {
  expiresIn: number;
  token: string;
  refreshToken: string;
}
