/*
  Warnings:

  - Added the required column `clothing_type` to the `measurements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `measurements` ADD COLUMN `clothing_type` VARCHAR(100) NOT NULL;
