/*
  Warnings:

  - The `city` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "City" AS ENUM ('Moscow', 'SaintPetersburg', 'Vladivostok');

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "deadline" SET DEFAULT NOW() + INTERVAL '7 DAYS',
DROP COLUMN "city",
ADD COLUMN     "city" "City" NOT NULL DEFAULT 'Moscow',
DROP COLUMN "status",
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'New';
