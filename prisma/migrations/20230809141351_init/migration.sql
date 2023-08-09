-- CreateTable
CREATE TABLE `Location` (
    `id` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProfile` (
    `username` VARCHAR(191) NOT NULL,
    `sex` ENUM('MALE', 'FEMALE') NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` DOUBLE NOT NULL,
    `locationId` VARCHAR(191) NOT NULL,
    `willingToRelocate` ENUM('YES', 'NO', 'UNKNOWN') NOT NULL,
    `children` ENUM('HAS_AND_WANTS', 'HAS_AND_DOES_NOT_WANT', 'HAS_NOT_AND_DOES_NOT_WANT', 'HAS_NOT_AND_DOES_WANT') NOT NULL,
    `ethnicity` ENUM('WHITE', 'BLACK_OR_AFRICAN_AMERICAN', 'AMERICAN_INDIAN_OR_ALASKA_NATIVE', 'ASIAN', 'NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER', 'OTHER') NOT NULL,
    `drinking` ENUM('INFREQUENT', 'MILD', 'SOCIAL', 'FREQUENT', 'HEAVY', 'NEVER') NOT NULL,
    `consumables` ENUM('SMOKING', 'VAPING', 'OCCASIONAL_CIGARS', 'EDIBLES_GUMMIES', 'NO_CONSUMABLES') NOT NULL,
    `politicalBeliefs` ENUM('CONSERVATIVE', 'CONSERVATIVE_LEANING_MODERATE', 'MODERATE', 'LIBERAL_LEANING_MODERATE', 'LIBERAL', 'INDEPENDENT', 'APOLITICAL') NOT NULL,
    `levelOfEducation` ENUM('DOCTORATE', 'MASTERS', 'BACHELORS', 'ASSOCIATES', 'HIGH_SCHOOL', 'NO_DEGREE') NOT NULL,
    `purity` ENUM('VIRGIN_WAITING', 'NOT_VIRGIN_WAITING', 'VIRGIN_NOT_WAITING', 'NOT_VIRGIN_NOT_WAITING', 'PURITY_UNKNOWN') NOT NULL,
    `onlyLookingForTraditionalHousehold` ENUM('YES', 'NO', 'UNKNOWN') NOT NULL,
    `income` ENUM('SINGLE', 'DUAL', 'EITHER') NOT NULL,
    `maritalStatus` ENUM('NEVER_MARRIED', 'WIDOWED', 'DIVORCED') NOT NULL,
    `activity` ENUM('INFREQUENT', 'MILD', 'FREQUENT', 'HEAVY', 'NEVER') NOT NULL,
    `religion` ENUM('AGNOSTICISM', 'ATHEISM', 'BUDDHISM', 'CHRISTIANITY', 'HINDUISM', 'JUDAISM', 'MORMONISM', 'OTHER') NOT NULL,
    `bio` LONGTEXT NULL,
    `weightUnit` ENUM('LBS', 'KG') NOT NULL,

    UNIQUE INDEX `UserProfile_username_key`(`username`),
    INDEX `UserProfile_locationId_idx`(`locationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userProfileUsername` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_userProfileUsername_idx`(`userProfileUsername`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
