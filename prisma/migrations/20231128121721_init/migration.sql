-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "embedding" vector(3),

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
