/*
  Warnings:

  - A unique constraint covering the columns `[referral_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referral_code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `referral_code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_referral_code_key` ON `User`(`referral_code`);
