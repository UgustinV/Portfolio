/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "public"."Project_description_key";

-- DropIndex
DROP INDEX "public"."Project_projectUrl_key";

-- DropIndex
DROP INDEX "public"."Project_title_key";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_password_key" ON "public"."Admin"("password");
