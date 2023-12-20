/*
  Warnings:

  - You are about to drop the column `name` on the `tailors` table. All the data in the column will be lost.
  - Added the required column `store_name` to the `tailors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tailors` DROP COLUMN `name`,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL,
    ADD COLUMN `store_name` VARCHAR(100) NOT NULL,
    MODIFY `profile_picture` VARCHAR(255) NULL DEFAULT 'https://storage.googleapis.com/clothize-app/default-profile-pict.png';
