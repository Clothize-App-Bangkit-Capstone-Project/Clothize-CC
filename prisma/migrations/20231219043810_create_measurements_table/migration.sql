-- CreateTable
CREATE TABLE `measurements` (
    `measurement_id` VARCHAR(191) NOT NULL,
    `clothing_size` VARCHAR(6) NOT NULL,
    `picture` VARCHAR(255) NOT NULL,
    `body_circumstances` INTEGER NOT NULL,
    `shoulder_width` INTEGER NOT NULL,
    `body_length` INTEGER NOT NULL,
    `chest_circumstances` INTEGER NOT NULL,
    `gender` VARCHAR(100) NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `measurements_user_id_key`(`user_id`),
    PRIMARY KEY (`measurement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `measurements` ADD CONSTRAINT `measurements_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
