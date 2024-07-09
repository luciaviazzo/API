-- CreateTable
CREATE TABLE "users_saved_paintings" (
    "book_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_saved_paintings_pkey" PRIMARY KEY ("book_id","user_id")
);

-- AddForeignKey
ALTER TABLE "users_saved_paintings" ADD CONSTRAINT "users_saved_paintings_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "paintings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_saved_paintings" ADD CONSTRAINT "users_saved_paintings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
