/*
  Warnings:

  - The `city` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "deadline" SET DEFAULT NOW() + INTERVAL '7 DAYS',
DROP COLUMN "city",
ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Москва',
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'new';
