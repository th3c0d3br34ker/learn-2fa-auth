/*
  Warnings:

  - A unique constraint covering the columns `[secret]` on the table `Otp` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `secret` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "secret" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Otp_secret_key" ON "Otp"("secret");
