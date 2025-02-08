import { PoolConnection } from "mysql2/promise";
import { Request } from "express";


// Declara la propiedad dbConnection en el objeto Request de Express.

declare module "express-serve-static-core" {
  interface Request {
    dbConnection?: PoolConnection;
  }
}
