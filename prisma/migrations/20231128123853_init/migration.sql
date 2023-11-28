-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "embedding" vector(200),

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);
