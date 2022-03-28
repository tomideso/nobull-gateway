const TYPES = {
  Redis: Symbol("Redis"),
  Controller: Symbol("Controller"),
  Passport: Symbol("Passport"),
  OTPService: Symbol("OTP"),
  UserService: Symbol("User"),
  AccountRepo: Symbol("AccountRepo"),
  ProductService: Symbol("Product"),
  PaymentPlanService: Symbol("PaymentPlan"),
  SubscriptionService: Symbol("Subscription"),
  PaymentService: Symbol("Payment"),
  InvoiceService: Symbol("Invoice")
};

export default TYPES;
