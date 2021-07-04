import * as RedisClient from "ioredis";

export const Redis = () => {
  const url = process.env.REDIS_URL || "redis://nobull:TLJ6WAFTHDyhSkwrEvGNzqoaIgevN6oF@redis-11043.c275.us-east-1-4.ec2.cloud.redislabs.com:11043";
  return new RedisClient(url);
};
