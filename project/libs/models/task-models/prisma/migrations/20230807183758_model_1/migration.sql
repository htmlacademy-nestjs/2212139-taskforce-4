/*
  Warnings:

  - Added the required column `executor_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "executor_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "deadline" SET DEFAULT NOW() + INTERVAL '7 DAYS';
