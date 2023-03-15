import { PrismaClient } from "@prisma/client";

/*
    This is specific for NEXT.JS
    Since NEXT.JS will hot reload
    we want to prevent multiple instances of the prisma client
    the globalThis variable isn't affected by hot reloads
 */

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
