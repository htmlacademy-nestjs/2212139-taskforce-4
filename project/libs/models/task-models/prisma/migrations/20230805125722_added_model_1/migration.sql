/*
  Warnings:

  - You are about to drop the `_CategoryToTask` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_name` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToTask" DROP CONSTRAINT "_CategoryToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTask" DROP CONSTRAINT "_CategoryToTask_B_fkey";

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "category_name" TEXT NOT NULL,
ALTER COLUMN "deadline" SET DEFAULT NOW() + INTERVAL '7 DAYS';

-- DropTable
DROP TABLE "_CategoryToTask";

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "categories"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
