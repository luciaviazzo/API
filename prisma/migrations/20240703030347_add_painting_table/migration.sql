-- CreateTable
CREATE TABLE "paintings" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(80) NOT NULL,
    "author" VARCHAR(80) NOT NULL,
    "created at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paintings_pkey" PRIMARY KEY ("id")
);
