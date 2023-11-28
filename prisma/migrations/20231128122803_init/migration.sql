/*
  Warnings:

  - You are about to drop the `iitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tv` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "iitem";

-- DropTable
DROP TABLE "item";

-- DropTable
DROP TABLE "movie";

-- DropTable
DROP TABLE "tv";

-- CreateTable
CREATE TABLE "ttv" (
    "id" INTEGER NOT NULL,
    "embedding" vector(384),
    "first_air_date" TEXT NOT NULL,
    "genre_ids" INTEGER[],
    "name" TEXT NOT NULL,
    "origin_country" TEXT[],
    "original_language" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "poster_path" TEXT NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,

    CONSTRAINT "ttv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moovie" (
    "embedding" vector(384),
    "id" INTEGER NOT NULL,
    "genre_ids" INTEGER[],
    "original_language" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "poster_path" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "video" BOOLEAN NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,

    CONSTRAINT "moovie_pkey" PRIMARY KEY ("id")
);
