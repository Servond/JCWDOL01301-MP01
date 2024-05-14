/*
  Warnings:

  - You are about to drop the column `referral_code` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_referral_code_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `referral_code`;
