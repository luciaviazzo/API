-- CreateTable
CREATE TABLE "paintings" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(80) NOT NULL,
    "author" VARCHAR(80) NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "created at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paintings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
