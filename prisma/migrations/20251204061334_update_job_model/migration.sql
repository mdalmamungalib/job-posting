/*
  Warnings:

  - You are about to drop the column `company` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Job` table. All the data in the column will be lost.
  - Added the required column `jobTitle` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "company",
DROP COLUMN "salary",
DROP COLUMN "title",
DROP COLUMN "type",
ADD COLUMN     "applicationEmail" TEXT,
ADD COLUMN     "applicationUrl" TEXT,
ADD COLUMN     "benefits" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "companyLogo" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "experienceLevel" TEXT,
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ADD COLUMN     "jobType" TEXT,
ADD COLUMN     "remotePolicy" TEXT,
ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "salaryRange" TEXT,
ALTER COLUMN "location" DROP NOT NULL;
