/*
  Warnings:

  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;
