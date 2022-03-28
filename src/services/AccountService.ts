import Account from "../entity/Account";
// import AccountRepository from "../Repository/AccountRepository";
import { injectable, inject } from "inversify";
import TYPES from "../config/types";
import { Redis } from "ioredis";
import { AppError } from "@/ErrorHandler/AppError";
import { CustomResponse } from "@/ErrorHandler/CustomResponse";

@injectable()
export class AccountServiceImpl implements AccountService {
  // private accountRepo: AccountRepository;

  private redisClient: Redis;

  constructor(
    @inject(TYPES.Redis) redisClient: Redis,
    @inject(TYPES.AccountRepo) accountRepo
  ) {
    this.redisClient = redisClient;
    // this.accountRepo = accountRepo;
  }

  public async getUserById(id) {
    return Account.findById(id).lean()
  }
  public async getUserByUserId(userId) {
    return Account.findOne({ userId }).lean()
  }
  public async getbyUserAndUpdate(cond, update) {
    return Account.findOneAndUpdate(cond, update, { new: true });
  }
}

export interface AccountService {
  getUserById(userId: string);
  getUserByUserId(userId: string);
  getbyUserAndUpdate(cond, update)
}
