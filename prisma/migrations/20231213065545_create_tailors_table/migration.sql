-- CreateTable
CREATE TABLE `tailors` (
    `tailor_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `profile_picture` VARCHAR(255) NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tailors_user_id_key`(`user_id`),
    PRIMARY KEY (`tailor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tailors` ADD CONSTRAINT `tailors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
