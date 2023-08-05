-- DropIndex
DROP INDEX "categories_name_key";

-- DropIndex
DROP INDEX "tags_name_key";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "deadline" SET DEFAULT NOW() + INTERVAL '7 DAYS';
