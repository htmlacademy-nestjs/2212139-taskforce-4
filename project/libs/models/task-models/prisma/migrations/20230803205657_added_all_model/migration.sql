/*
  Warnings:

  - You are about to drop the column `category_id` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_category_id_fkey";

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "category_id";

-- CreateTable
CREATE TABLE "_CategoryToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToTask_AB_unique" ON "_CategoryToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToTask_B_index" ON "_CategoryToTask"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToTask" ADD CONSTRAINT "_CategoryToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTask" ADD CONSTRAINT "_CategoryToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
