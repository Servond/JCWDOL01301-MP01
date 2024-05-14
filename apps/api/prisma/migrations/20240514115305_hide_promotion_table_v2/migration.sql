/*
  Warnings:

  - You are about to drop the column `promotionId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the `Promotion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `event_promotionId_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `promotionId`;

-- DropTable
DROP TABLE `Promotion`;
