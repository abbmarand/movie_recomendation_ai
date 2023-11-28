/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "embedding" vector(3),

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);
