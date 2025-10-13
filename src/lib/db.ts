import { PrismaClient, type users } from "@prisma/client";
import { AccessedModelUser, type AccessedModelUserType } from './model';
import z from "zod";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if(import.meta.env.NODE_ENV != "production") globalForPrisma.prisma = prisma;