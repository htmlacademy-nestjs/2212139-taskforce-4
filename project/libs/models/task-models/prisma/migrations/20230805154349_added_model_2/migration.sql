/*
  Warnings:

  - You are about to drop the column `category_name` on the `tasks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `city` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "City" AS ENUM ('Moscow', 'SPb', 'Vladivostok');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('New', 'Canceled', 'InWork', 'Done', 'Failed');

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_category_name_fkey";

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "evaluation" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "category_name",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "comments_count" INTEGER DEFAULT 0,
ADD COLUMN     "responses_count" INTEGER DEFAULT 0,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "deadline" DROP NOT NULL,
ALTER COLUMN "deadline" SET DEFAULT NOW() + INTERVAL '7 DAYS',
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
DROP COLUMN "city",
ADD COLUMN     "city" "City" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TaskStatus" NOT NULL;

-- CreateTable
CREATE TABLE "responses" (
    "response_id" SERIAL NOT NULL,
    "offerPrice" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("response_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;
