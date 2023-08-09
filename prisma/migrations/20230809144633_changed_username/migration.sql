/*
  Warnings:

  - You are about to drop the column `userProfileUsername` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[redditUserName]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `redditUserName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redditUserName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_userProfileUsername_idx` ON `User`;

-- DropIndex
DROP INDEX `UserProfile_username_key` ON `UserProfile`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `userProfileUsername`,
    ADD COLUMN `redditUserName` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserProfile` DROP COLUMN `username`,
    ADD COLUMN `redditUserName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- CreateIndex
CREATE INDEX `User_redditUserName_idx` ON `User`(`redditUserName`);

-- CreateIndex
CREATE UNIQUE INDEX `UserProfile_redditUserName_key` ON `UserProfile`(`redditUserName`);
