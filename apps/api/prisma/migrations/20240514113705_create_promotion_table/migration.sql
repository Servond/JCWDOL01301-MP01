/*
  Warnings:

  - You are about to drop the `Promotion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `event_promotionId_fkey`;

-- DropTable
DROP TABLE `Promotion`;

-- CreateTable
CREATE TABLE `promotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `promotion_name` VARCHAR(191) NOT NULL,
    `discount` INTEGER NOT NULL,
    `usage_limit` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `promotion_promotion_name_key`(`promotion_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `promotion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
