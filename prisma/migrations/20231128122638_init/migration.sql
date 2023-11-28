-- CreateTable
CREATE TABLE "iitem" (
    "id" SERIAL NOT NULL,
    "embedding" vector(4),

    CONSTRAINT "iitem_pkey" PRIMARY KEY ("id")
);
