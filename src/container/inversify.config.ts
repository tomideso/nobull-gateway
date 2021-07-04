import { Container } from "inversify";
import TYPES from "../config/types";
import { Redis } from "ioredis";
import { Redis as RedisClient } from "../config/redis";
import { Passport, PassportImpl } from "../utility/passport";
import { UserServiceImpl, UserService } from "@/services/UserService";
import {
  PaymentPlanServiceImpl,
  PaymentPlanService
} from "@/services/PaymentPlanService";
import { ProductServiceImpl, ProductService } from "@/services/ProductService";
import { SubscriptionServiceImpl, SubscriptionService } from "@/services/SubscriptionService";
import { InvoiceServiceImpl, InvoiceService } from "@/services/InvoiceService";
import {
  PaymentServiceImpl,
  PaymentService
} from "@/services/PaymentService";

const container = new Container();
container.bind<Redis>(TYPES.Redis).toConstantValue(RedisClient());
container.bind<Passport>(TYPES.Passport).to(PassportImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<SubscriptionService>(TYPES.SubscriptionService).to(SubscriptionServiceImpl);
container
  .bind<PaymentPlanService>(TYPES.PaymentPlanService)
  .to(PaymentPlanServiceImpl);
container
  .bind<PaymentService>(TYPES.PaymentService)
  .to(PaymentServiceImpl);
container.bind<ProductService>(TYPES.ProductService).to(ProductServiceImpl);
container.bind<InvoiceService>(TYPES.InvoiceService).to(InvoiceServiceImpl);

export default container;
