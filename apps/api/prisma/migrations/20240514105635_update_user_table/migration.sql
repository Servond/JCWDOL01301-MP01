/*
  Warnings:

  - You are about to drop the column `referredById` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_referredById_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `referredById`,
    MODIFY `referral_code` VARCHAR(191) NOT NULL;
