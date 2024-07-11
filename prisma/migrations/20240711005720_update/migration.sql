/*
  Warnings:

  - The primary key for the `users_saved_paintings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `book_id` on the `users_saved_paintings` table. All the data in the column will be lost.
  - Added the required column `painting_id` to the `users_saved_paintings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_saved_paintings" DROP CONSTRAINT "users_saved_paintings_book_id_fkey";

-- AlterTable
ALTER TABLE "users_saved_paintings" DROP CONSTRAINT "users_saved_paintings_pkey",
DROP COLUMN "book_id",
ADD COLUMN     "painting_id" INTEGER NOT NULL,
ADD CONSTRAINT "users_saved_paintings_pkey" PRIMARY KEY ("painting_id", "user_id");

-- AddForeignKey
ALTER TABLE "users_saved_paintings" ADD CONSTRAINT "users_saved_paintings_painting_id_fkey" FOREIGN KEY ("painting_id") REFERENCES "paintings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
