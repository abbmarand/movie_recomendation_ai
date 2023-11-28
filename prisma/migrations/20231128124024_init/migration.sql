/*
  Warnings:

  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "test";

-- CreateTable
CREATE TABLE "testt" (
    "id" SERIAL NOT NULL,
    "embedding" vector(384),

    CONSTRAINT "testt_pkey" PRIMARY KEY ("id")
);
