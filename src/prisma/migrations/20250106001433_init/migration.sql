/*
  Warnings:

  - You are about to drop the `contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `contact`;

-- CreateTable
CREATE TABLE `Contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
